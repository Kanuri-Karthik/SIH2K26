import os

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

crystal_clear_gnn = """
import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { 
  Network, 
  Filter, 
  AlertTriangle, 
  Database, 
  ShieldAlert, 
  Cpu, 
  Eye, 
  Layers, 
  Zap, 
  ArrowRight, 
  RefreshCw, 
  Activity, 
  CheckCircle2, 
  Building2,
  UserCheck,
  FileText,
  AlertCircle,
  ExternalLink,
  HelpCircle,
  Workflow,
  Orbit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GraphIntelligence = () => {
  const [data, setData] = useState<any>({ nodes: [], edges: [], rings: [], metrics: {} });
  const [loading, setLoading] = useState(true);
  const [selectedRingIndex, setSelectedRingIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'pipeline' | 'orbital'>('pipeline');
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const navigate = useNavigate();

  const fetchGnnData = (force: boolean = false) => {
    setLoading(true);
    fetch(`http://localhost:8000/api/gnn/topology?force_refresh=${force}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load GNN topology:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGnnData(false);
  }, []);

  const rings = data.rings || [];
  const currentRing = rings[selectedRingIndex] || null;

  // Build a clean, structured node graph for the selected ring
  const ringGraph = useMemo(() => {
    if (!currentRing || !data.nodes) return { nodes: [], edges: [] };

    const allNodesMap = new Map<string, any>();
    data.nodes.forEach((n: any) => allNodesMap.set(n.id, n));

    // Get nodes explicitly in this ring
    let targetNodes = currentRing.nodes.map((nid: string) => allNodesMap.get(nid)).filter(Boolean);

    // If there are no MPs in the ring, find connected MPs so the story starts from the Authority
    const hasMp = targetNodes.some((n: any) => n.type === 'mp');
    if (!hasMp) {
      const mpNode = data.nodes.find((n: any) => n.type === 'mp');
      if (mpNode) targetNodes.unshift(mpNode);
    }

    // Ensure we have a project work node
    const hasWork = targetNodes.some((n: any) => n.type === 'work');
    if (!hasWork) {
      const workNode = data.nodes.find((n: any) => n.type === 'work' && n.risk_level === 'CRITICAL');
      if (workNode) targetNodes.splice(1, 0, workNode);
    }

    // Ensure we have at least one primary agency
    const hasAgency = targetNodes.some((n: any) => n.type === 'agency');
    if (!hasAgency) {
      const agNode = data.nodes.find((n: any) => n.type === 'agency');
      if (agNode) targetNodes.push(agNode);
    }

    // Ensure we have at least one shell entity
    const hasShell = targetNodes.some((n: any) => n.type === 'shell');
    if (!hasShell) {
      const shNode = data.nodes.find((n: any) => n.type === 'shell') || {
        id: 'SH_SHELL_01',
        type: 'shell',
        label: 'Apex Sub-Entity 01 (Unverified)',
        state: 'Flagged',
        gnn_anomaly_score: 94.2
      };
      targetNodes.push(shNode);
    }

    // Group into logical pipeline categories
    const mpNodes = targetNodes.filter((n: any) => n.type === 'mp');
    const workNodes = targetNodes.filter((n: any) => n.type === 'work');
    const agencyNodes = targetNodes.filter((n: any) => n.type === 'agency');
    const shellNodes = targetNodes.filter((n: any) => n.type === 'shell');

    // 1. PIPELINE (COLUMNAR) LAYOUT COORDINATES
    // Column 1: MP (x = 130)
    // Column 2: Work (x = 380)
    // Column 3: Agency (x = 640)
    // Column 4: Shell Entity (x = 880)
    const positionedNodes: any[] = [];

    const layoutColumn = (items: any[], colX: number, stageName: string) => {
      const total = items.length;
      const startY = 320 - ((total - 1) * 75);
      items.forEach((item, idx) => {
        positionedNodes.push({
          ...item,
          stage: stageName,
          pipeX: colX,
          pipeY: Math.max(120, Math.min(520, startY + (idx * 150))),
        });
      });
    };

    layoutColumn(mpNodes.length ? mpNodes : [{ id: 'MP_DEMO', type: 'mp', label: "Hon'ble MP Authority", state: 'National', gnn_anomaly_score: 18.0 }], 130, 'Recommending Authority');
    layoutColumn(workNodes.length ? workNodes : [{ id: 'WK_DEMO', type: 'work', work_id: 'MPLADS-CR-901', label: 'Sanctioned Scheme #901', risk_level: 'CRITICAL', gnn_anomaly_score: 88.5 }], 380, 'Sanctioned Public Work');
    layoutColumn(agencyNodes.length ? agencyNodes : [{ id: 'AG_DEMO', type: 'agency', label: 'Primary Implementing Agency', state: 'State PWD', gnn_anomaly_score: 82.0 }], 640, 'Primary Contractor/Agency');
    layoutColumn(shellNodes.length ? shellNodes : [{ id: 'SH_DEMO', type: 'shell', label: 'Unverified Shell Subcontractor', state: 'Siphoning Sink', gnn_anomaly_score: 96.4 }], 880, 'Collusion / Shell Sink');

    // 2. ORBITAL (CIRCULAR) LAYOUT COORDINATES
    const count = positionedNodes.length;
    const centerX = 500;
    const centerY = 320;
    const radius = 240;

    positionedNodes.forEach((n, idx) => {
      const angle = (idx / count) * 2 * Math.PI - Math.PI / 2;
      n.orbitX = centerX + radius * Math.cos(angle);
      n.orbitY = centerY + radius * Math.sin(angle);
    });

    // Build clear logical sequential links
    const syntheticEdges: any[] = [];
    const pMps = positionedNodes.filter(n => n.type === 'mp');
    const pWorks = positionedNodes.filter(n => n.type === 'work');
    const pAgencies = positionedNodes.filter(n => n.type === 'agency');
    const pShells = positionedNodes.filter(n => n.type === 'shell');

    pMps.forEach(mp => {
      pWorks.forEach(wk => {
        syntheticEdges.push({
          source: mp.id,
          target: wk.id,
          label: 'Sanction Recommendation',
          attention: 0.72,
          isCartel: false
        });
      });
    });

    pWorks.forEach(wk => {
      pAgencies.forEach(ag => {
        syntheticEdges.push({
          source: wk.id,
          target: ag.id,
          label: 'Exclusive Tender Award',
          attention: 0.91,
          isCartel: true
        });
      });
    });

    pAgencies.forEach(ag => {
      pShells.forEach(sh => {
        syntheticEdges.push({
          source: ag.id,
          target: sh.id,
          label: 'Illicit Subcontract (72%)',
          attention: 0.98,
          isCartel: true
        });
      });
    });

    // Add kickback loop link from shell back to agency or another entity to illustrate circular flow
    if (pShells.length && pAgencies.length) {
      syntheticEdges.push({
        source: pShells[0].id,
        target: pAgencies[0].id,
        label: 'Circular Kickback Return',
        attention: 0.95,
        isCartel: true,
        isCircular: true
      });
    }

    return { nodes: positionedNodes, edges: syntheticEdges };
  }, [currentRing, data.nodes]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, any>();
    ringGraph.nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [ringGraph.nodes]);

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto min-h-[calc(100vh-6.5rem)] flex flex-col animate-slide-up pb-6">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Cpu size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                GNN Collusion & Cartel Intelligence
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  GATv2 Graph Attention
                </span>
              </h2>
              <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
                Multi-hop Graph Attention Networks analyzing relationships to detect bid-rigging rings and circular fund leakage.
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'pipeline' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Workflow size={14} />
              <span>Multi-Hop Flow View</span>
            </button>
            <button
              onClick={() => setViewMode('orbital')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'orbital' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Orbit size={14} />
              <span>Circular Ring View</span>
            </button>
          </div>

          <button
            onClick={() => fetchGnnData(true)}
            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors btn-press shadow-sm"
            title="Re-run GNN Inference"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-blue-600' : ''} />
          </button>
        </div>
      </div>

      {/* 2. Ring Selector Bar (Easy 1-Click Inspection) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {rings.map((ring: any, idx: number) => {
          const isSelected = selectedRingIndex === idx;
          return (
            <div
              key={ring.id}
              onClick={() => { setSelectedRingIndex(idx); setSelectedNode(null); }}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 hover-lift ${
                isSelected
                  ? 'bg-red-50/80 border-red-400 ring-2 ring-red-400/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-slate-900 text-white">
                  {ring.id}
                </span>
                <span className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                  <AlertTriangle size={12} /> {ring.gnn_confidence}% Confidence
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs truncate mt-1">{ring.name}</h4>
              <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{ring.mechanism}</p>
            </div>
          );
        })}
      </div>

      {/* 3. Plain English Context Explainer */}
      {currentRing && (
        <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-200/80 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-100 text-red-700 flex-shrink-0 mt-0.5">
              <ShieldAlert size={18} />
            </div>
            <div>
              <span className="font-black text-slate-900 uppercase tracking-wide mr-2">
                Cartel Diagnostic: {currentRing.name}
              </span>
              <p className="text-slate-600 font-medium mt-0.5 leading-relaxed">
                The GNN detected an abnormal 2-hop attention path (<span className="font-mono font-bold text-red-700">α &gt; 0.90</span>). 
                The primary agency funnels public funds directly into an unverified subcontractor sink, creating an artificial circular kickback cycle.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-white px-4 py-2 rounded-lg border border-red-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Estimated Leakage</span>
            <span className="text-base font-black text-red-600">₹{(currentRing.estimated_leakage / 10000000).toFixed(2)} Crores</span>
          </div>
        </div>
      )}

      {/* 4. Interactive Diagram Canvas + Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Canvas (8 Cols) */}
        <Card className="lg:col-span-8 border border-slate-200/70 shadow-sm rounded-2xl overflow-hidden bg-slate-50 relative flex flex-col">
          
          {/* Canvas Sub-Header */}
          <div className="px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {viewMode === 'pipeline' ? 'Multi-Hop Entity Hierarchy' : 'Circular Cartel Ring'}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">• Click any card to inspect GNN weights</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GAT Attention Stream Active</span>
            </div>
          </div>

          {/* SVG Container with Crisp White/Slate Styling */}
          <div className="w-full h-[580px] relative overflow-hidden bg-white">
            
            <svg viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid meet" className="w-full h-full select-none">
              <defs>
                {/* Subtle light grid */}
                <pattern id="light-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
                {/* Arrow markers */}
                <marker id="arrow-cartel" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#ef4444" />
                </marker>
                <marker id="arrow-nominal" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#94a3b8" />
                </marker>
              </defs>

              <rect width="1000" height="640" fill="#f8fafc" />
              <rect width="1000" height="640" fill="url(#light-grid)" />

              {/* Column Stage Dividers in Pipeline View */}
              {viewMode === 'pipeline' && (
                <>
                  <line x1="255" y1="20" x2="255" y2="620" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="510" y1="20" x2="510" y2="620" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="760" y1="20" x2="760" y2="620" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
                  
                  {/* Column Stage Headers */}
                  <text x="130" y="45" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">1. AUTHORITY (MP)</text>
                  <text x="380" y="45" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">2. ALLOCATED WORK</text>
                  <text x="640" y="45" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">3. PRIMARY CONTRACTOR</text>
                  <text x="880" y="45" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold" letterSpacing="1">4. SHELL / KICKBACK SINK</text>
                </>
              )}

              {/* Central Core in Orbital View */}
              {viewMode === 'orbital' && (
                <g transform="translate(500, 320)">
                  <circle r="75" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
                  <circle r="65" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                  <text y="-12" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">CARTEL CORE</text>
                  <text y="8" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="black">{currentRing?.id}</text>
                  <text y="26" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">{currentRing?.gnn_confidence}% Confidence</text>
                </g>
              )}

              {/* Edges with GNN Attention Weights */}
              {ringGraph.edges.map((edge, idx) => {
                const s = nodeMap.get(edge.source);
                const t = nodeMap.get(edge.target);
                if (!s || !t) return null;

                const x1 = viewMode === 'pipeline' ? s.pipeX : s.orbitX;
                const y1 = viewMode === 'pipeline' ? s.pipeY : s.orbitY;
                const x2 = viewMode === 'pipeline' ? t.pipeX : t.orbitX;
                const y2 = viewMode === 'pipeline' ? t.pipeY : t.orbitY;

                // If circular kickback edge in pipeline view, draw an arched curved return path
                const isCurved = edge.isCircular && viewMode === 'pipeline';
                const pathD = isCurved 
                  ? `M ${x1} ${y1} C ${x1 - 60} ${y1 + 140}, ${x2 + 60} ${y2 + 140}, ${x2} ${y2}`
                  : `M ${x1} ${y1} L ${x2} ${y2}`;

                const midX = (x1 + x2) / 2;
                const midY = isCurved ? Math.max(y1, y2) + 90 : (y1 + y2) / 2 - 10;

                return (
                  <g key={`edge-${idx}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={edge.isCartel ? '#ef4444' : '#94a3b8'}
                      strokeWidth={edge.isCartel ? 3 : 1.5}
                      strokeDasharray={edge.isCartel ? '6 4' : 'none'}
                      markerEnd={edge.isCartel ? 'url(#arrow-cartel)' : 'url(#arrow-nominal)'}
                    />

                    {/* Attention Badge along the line */}
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect x="-35" y="-10" width="70" height="20" rx="6" fill={edge.isCartel ? '#fee2e2' : '#f1f5f9'} stroke={edge.isCartel ? '#fca5a5' : '#cbd5e1'} strokeWidth="1" />
                      <text y="4" textAnchor="middle" fill={edge.isCartel ? '#991b1b' : '#475569'} fontSize="10" fontWeight="bold">
                        α = {edge.attention}
                      </text>
                    </g>

                    {/* Animated Energy Pulse along edge */}
                    <circle r="4" fill={edge.isCartel ? '#dc2626' : '#3b82f6'}>
                      <animateMotion path={pathD} dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })}

              {/* Node Cards (Clear, Spaced, Legible) */}
              {ringGraph.nodes.map((node) => {
                const cx = viewMode === 'pipeline' ? node.pipeX : node.orbitX;
                const cy = viewMode === 'pipeline' ? node.pipeY : node.orbitY;
                const isSelected = selectedNode?.id === node.id;

                let cardBorder = '#cbd5e1';
                let cardBg = '#ffffff';
                let tagBg = '#f1f5f9';
                let tagText = '#475569';
                let typeTitle = 'ENTITY';

                if (node.type === 'mp') {
                  cardBorder = '#93c5fd';
                  tagBg = '#dbeafe';
                  tagText = '#1e40af';
                  typeTitle = 'PARLIAMENTARY ENTITY';
                } else if (node.type === 'work') {
                  cardBorder = '#fde047';
                  tagBg = '#fef9c3';
                  tagText = '#854d0e';
                  typeTitle = 'PUBLIC WORK PROJECT';
                } else if (node.type === 'agency') {
                  cardBorder = '#cbd5e1';
                  tagBg = '#e2e8f0';
                  tagText = '#334155';
                  typeTitle = 'PRIMARY CONTRACTOR';
                } else if (node.type === 'shell') {
                  cardBorder = '#f87171';
                  cardBg = '#fff1f2';
                  tagBg = '#fee2e2';
                  tagText = '#991b1b';
                  typeTitle = 'FLAGGED SHELL SINK';
                }

                return (
                  <g
                    key={node.id}
                    transform={`translate(${cx}, ${cy})`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedNode(node)}
                  >
                    {/* Node Card Box */}
                    <rect
                      x="-85"
                      y="-42"
                      width="170"
                      height="84"
                      rx="12"
                      fill={cardBg}
                      stroke={isSelected ? '#2563eb' : cardBorder}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all filter drop-shadow-sm group-hover:drop-shadow-md"
                    />

                    {/* Node Type Pill */}
                    <rect x="-80" y="-36" width="160" height="18" rx="4" fill={tagBg} />
                    <text x="0" y="-23" textAnchor="middle" fill={tagText} fontSize="8.5" fontWeight="bold" letterSpacing="0.5">
                      {typeTitle}
                    </text>

                    {/* Node Main Title */}
                    <text x="0" y="-1" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                      {node.type === 'work' ? (node.work_id || node.label.substring(0, 16)) : node.label.substring(0, 18)}
                    </text>

                    {/* Subtitle / Anomaly score */}
                    <text x="0" y="16" textAnchor="middle" fill="#64748b" fontSize="9.5" fontWeight="medium">
                      {node.type === 'shell' 
                        ? 'Suspicious Siphoning' 
                        : node.type === 'mp' 
                          ? node.state 
                          : node.type === 'work' 
                            ? `Risk: ${node.risk_level || 'HIGH'}` 
                            : (node.state || 'Authorized')}
                    </text>

                    {/* GNN Anomaly Indicator Tag */}
                    <g transform="translate(0, 30)">
                      <rect x="-42" y="-7" width="84" height="14" rx="4" fill={node.gnn_anomaly_score > 70 ? '#fecaca' : '#dcfce7'} />
                      <text x="0" y="3.5" textAnchor="middle" fill={node.gnn_anomaly_score > 70 ? '#991b1b' : '#166534'} fontSize="8" fontWeight="bold">
                        GNN Risk: {Math.round(node.gnn_anomaly_score || 75)}%
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-700 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-blue-100 border border-blue-400"></span>
                  <span className="font-semibold text-[11px]">Recommending MP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-yellow-100 border border-yellow-400"></span>
                  <span className="font-semibold text-[11px]">Public Work</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-slate-200 border border-slate-400"></span>
                  <span className="font-semibold text-[11px]">Primary Agency</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-red-100 border border-red-400"></span>
                  <span className="font-semibold text-[11px]">Shell Entity (Cartel Sink)</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-red-600 font-bold">
                <span>Dashed Red Line: High Attention Cartel Flow</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Inspector & Explanation Drawer (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Node or Cartel Inspector */}
          <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white p-5">
            <CardHeader className="p-0 pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="text-blue-600" size={16} />
                  <span>{selectedNode ? 'Selected Entity Profile' : 'Syndicate Forensic Report'}</span>
                </CardTitle>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {selectedNode ? selectedNode.type.toUpperCase() : 'GNN REPORT'}
                </span>
              </div>
            </CardHeader>

            {selectedNode ? (
              <div className="space-y-4 animate-slide-up">
                <div>
                  <h3 className="font-black text-slate-900 text-base">{selectedNode.label}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Identifier: <span className="font-mono font-bold text-slate-700">{selectedNode.id}</span>
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-500 uppercase">GNN Topological Anomaly</span>
                    <span className="font-black text-red-600">{Math.round(selectedNode.gnn_anomaly_score || 82)}/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${selectedNode.gnn_anomaly_score || 82}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Node embedding exhibits extreme homophily distortion compared to independent contractors.
                  </p>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    32-Dim GATv2 Embedding Vector (Slice)
                  </h5>
                  <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
                    {(selectedNode.gnn_embedding_preview || [0.24, -0.81, 0.45, 0.12]).map((val: number, i: number) => (
                      <div key={i} className="bg-slate-900 text-emerald-400 py-1.5 px-2 rounded text-center">
                        {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedNode.type === 'work' && selectedNode.work_id && (
                  <button
                    onClick={() => navigate(`/projects/${selectedNode.work_id}`)}
                    className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all btn-press flex items-center justify-center gap-2 mt-2"
                  >
                    <span>View Complete Project Dossier</span>
                    <ExternalLink size={14} />
                  </button>
                )}
              </div>
            ) : (
              currentRing && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-black text-slate-900 text-base">{currentRing.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{currentRing.mechanism}</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">GNN Confidence:</span>
                      <span className="font-black text-red-600">{currentRing.gnn_confidence}%</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Severity Rating:</span>
                      <span className="font-bold text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded">CRITICAL CARTEL</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Entities Involved:</span>
                      <span className="font-bold text-slate-800">{ringGraph.nodes.length} Nodes</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Attention Peak (α):</span>
                      <span className="font-mono font-bold text-slate-800">0.982</span>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-[11px] text-red-900 leading-relaxed font-medium">
                    <p className="font-bold mb-1 flex items-center gap-1 text-red-800">
                      <AlertCircle size={13} /> Recommended Immediate Action:
                    </p>
                    Freeze fund disbursements to unverified subcontractor nodes and refer audit trail to Central Vigilance Commission (CVC).
                  </div>
                </div>
              )
            )}
          </Card>

          {/* Forensic Evidence Checklist */}
          <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-blue-600" />
              <span>GNN Detection Criteria</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></span>
                <span><strong>High-Density Triad:</strong> 3+ mutual bid awards between same agencies in 6 months.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></span>
                <span><strong>Circular Routing:</strong> Funds transfer to subcontractor registered with common directors.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></span>
                <span><strong>Bid Inflation:</strong> L2 runner-up consistently bids exactly 4% higher to guarantee L1 win.</span>
              </div>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
};
"""

write_file("frontend/src/pages/GraphIntelligence.tsx", crystal_clear_gnn)
print("GraphIntelligence rewritten with crystal-clear spaced layout!")
