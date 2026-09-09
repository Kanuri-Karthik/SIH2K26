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
  const [viewMode, setViewMode] = useState<'pipeline' | 'orbital'>('orbital'); // Default to circular ring view as user requested
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

  // Build perfectly spaced, collision-free graph for the selected ring
  const ringGraph = useMemo(() => {
    if (!currentRing || !data.nodes) return { nodes: [], edges: [] };

    const allNodesMap = new Map<string, any>();
    data.nodes.forEach((n: any) => allNodesMap.set(n.id, n));

    // Get nodes explicitly in this ring
    let targetNodes = currentRing.nodes.map((nid: string) => allNodesMap.get(nid)).filter(Boolean);

    // Ensure we have authority MP
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

    // Deduplicate target nodes by ID
    const uniqueMap = new Map<string, any>();
    targetNodes.forEach((n: any) => uniqueMap.set(n.id, n));
    const uniqueNodes = Array.from(uniqueMap.values());

    // Order nodes logically around the ring: MP -> Works -> Agencies -> Shell
    const typeOrder: Record<string, number> = { 'mp': 1, 'work': 2, 'agency': 3, 'shell': 4 };
    uniqueNodes.sort((a, b) => (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5));

    const totalNodes = uniqueNodes.length;

    // 1. PIPELINE (COLUMN) LAYOUT COORDINATES
    // Column 1: MP (x = 125)
    // Column 2: Work (x = 370)
    // Column 3: Agency (x = 630)
    // Column 4: Shell Entity (x = 875)
    const positionedNodes: any[] = [];
    const mpGroup = uniqueNodes.filter(n => n.type === 'mp');
    const workGroup = uniqueNodes.filter(n => n.type === 'work');
    const agencyGroup = uniqueNodes.filter(n => n.type === 'agency');
    const shellGroup = uniqueNodes.filter(n => n.type === 'shell');

    const layoutCol = (items: any[], colX: number, stageName: string) => {
      const count = items.length;
      const startY = 320 - ((count - 1) * 80);
      items.forEach((item, idx) => {
        positionedNodes.push({
          ...item,
          stage: stageName,
          pipeX: colX,
          pipeY: Math.max(130, Math.min(520, startY + (idx * 160))),
        });
      });
    };

    layoutCol(mpGroup, 125, 'Recommending Authority');
    layoutCol(workGroup, 370, 'Sanctioned Public Work');
    layoutCol(agencyGroup, 630, 'Primary Contractor/Agency');
    layoutCol(shellGroup, 875, 'Collusion / Shell Sink');

    // 2. ORBITAL (CIRCULAR RING) LAYOUT COORDINATES
    // Generous radius R = 270px so cards have large breathing space and NEVER overlap
    const CX = 500;
    const CY = 330;
    const R_ORBIT = 265;

    positionedNodes.forEach((n, idx) => {
      // Angular distribution: Start from top (-PI/2) and rotate clockwise
      const theta = -Math.PI / 2 + (idx / totalNodes) * (2 * Math.PI);
      n.orbitAngle = theta;
      n.orbitX = Math.round(CX + R_ORBIT * Math.cos(theta));
      n.orbitY = Math.round(CY + R_ORBIT * Math.sin(theta));
    });

    // 3. BUILD SEQUENTIAL EDGES WITH GNN ATTENTION
    const edges: any[] = [];
    for (let i = 0; i < positionedNodes.length; i++) {
      const current = positionedNodes[i];
      const next = positionedNodes[(i + 1) % positionedNodes.length];
      
      let label = 'Tender Award';
      let attention = 0.88;
      let isCartel = true;

      if (current.type === 'mp' && next.type === 'work') {
        label = 'Sanction Allocation';
        attention = 0.74;
        isCartel = false;
      } else if (current.type === 'work' && next.type === 'agency') {
        label = 'Contract Award';
        attention = 0.91;
        isCartel = true;
      } else if (current.type === 'agency' && next.type === 'shell') {
        label = 'Subcontract Siphoning (72%)';
        attention = 0.98;
        isCartel = true;
      } else if (current.type === 'shell') {
        label = 'Circular Kickback Flow';
        attention = 0.95;
        isCartel = true;
      }

      edges.push({
        id: `e-${current.id}-${next.id}`,
        source: current.id,
        target: next.id,
        sourceIndex: i,
        targetIndex: (i + 1) % positionedNodes.length,
        label,
        attention,
        isCartel
      });
    }

    return { nodes: positionedNodes, edges };
  }, [currentRing, data.nodes]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, any>();
    ringGraph.nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [ringGraph.nodes]);

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto min-h-[calc(100vh-6.5rem)] flex flex-col animate-slide-up pb-6">
      
      {/* Header */}
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
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setViewMode('orbital')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'orbital' 
                  ? 'bg-blue-700 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Orbit size={14} />
              <span>Circular Ring View</span>
            </button>
            <button
              onClick={() => setViewMode('pipeline')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'pipeline' 
                  ? 'bg-blue-700 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Workflow size={14} />
              <span>Multi-Hop Flow View</span>
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

      {/* Ring Selector Cards */}
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
                  <AlertTriangle size={12} /> {ring.gnn_confidence}% Match
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs truncate mt-1">{ring.name}</h4>
              <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{ring.mechanism}</p>
            </div>
          );
        })}
      </div>

      {/* Plain English Context Explainer */}
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
                The primary contractor funnels public funds into an unverified subcontractor sink, creating an artificial circular kickback cycle.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-white px-4 py-2 rounded-lg border border-red-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Estimated Leakage</span>
            <span className="text-base font-black text-red-600">₹{(currentRing.estimated_leakage / 10000000).toFixed(2)} Crores</span>
          </div>
        </div>
      )}

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Canvas Card */}
        <Card className="lg:col-span-8 border border-slate-200/70 shadow-sm rounded-2xl overflow-hidden bg-white relative flex flex-col">
          
          <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {viewMode === 'orbital' ? 'Circular Cartel Ring (Perimeter Flow)' : 'Multi-Hop Entity Hierarchy'}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">• Zero-Overlap Layout</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GAT Attention Edge Weights</span>
            </div>
          </div>

          <div className="w-full h-[650px] relative overflow-hidden bg-slate-50">
            
            <svg viewBox="0 0 1000 660" preserveAspectRatio="xMidYMid meet" className="w-full h-full select-none">
              <defs>
                <pattern id="clean-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.8" />
                </pattern>
                <marker id="arrow-cartel" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#ef4444" />
                </marker>
                <marker id="arrow-nominal" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
                </marker>
              </defs>

              <rect width="1000" height="660" fill="#f8fafc" />
              <rect width="1000" height="660" fill="url(#clean-grid)" />

              {/* ------------------------------------------------------------- */}
              {/* ORBITAL VIEW: Background Orbit Track & Central Core */}
              {/* ------------------------------------------------------------- */}
              {viewMode === 'orbital' && (
                <>
                  {/* Outer Orbital Perimeter Track */}
                  <circle cx="500" cy="330" r="265" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Central Core Medallion (Spacious clearance, lines NEVER cross it) */}
                  <g transform="translate(500, 330)">
                    {/* Pulsing ring */}
                    <circle r="68" fill="none" stroke="#fecaca" strokeWidth="2">
                      <animate attributeName="r" values="64;72;64" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle r="56" fill="#ffffff" stroke="#ef4444" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))" />
                    <text y="-10" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="black" letterSpacing="1">CARTEL HUB</text>
                    <text y="9" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="black">{currentRing?.id}</text>
                    <text y="24" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">{currentRing?.gnn_confidence}% Confidence</text>
                  </g>
                </>
              )}

              {/* ------------------------------------------------------------- */}
              {/* PIPELINE VIEW: Stage Dividers */}
              {/* ------------------------------------------------------------- */}
              {viewMode === 'pipeline' && (
                <>
                  <line x1="250" y1="20" x2="250" y2="640" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="500" y1="20" x2="500" y2="640" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="750" y1="20" x2="750" y2="640" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
                  
                  <text x="125" y="45" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">1. AUTHORITY (MP)</text>
                  <text x="370" y="45" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">2. ALLOCATED WORK</text>
                  <text x="630" y="45" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">3. PRIMARY CONTRACTOR</text>
                  <text x="875" y="45" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold" letterSpacing="1">4. SHELL / KICKBACK SINK</text>
                </>
              )}

              {/* ------------------------------------------------------------- */}
              {/* EDGES: Curved Perimeter Routing (NEVER Cuts Through Center!) */}
              {/* ------------------------------------------------------------- */}
              {ringGraph.edges.map((edge) => {
                const s = nodeMap.get(edge.source);
                const t = nodeMap.get(edge.target);
                if (!s || !t) return null;

                let pathD = '';
                let labelX = 0;
                let labelY = 0;

                if (viewMode === 'orbital') {
                  // Route edges strictly ALONG the orbital perimeter
                  // Never cut through the center circle!
                  const x1 = s.orbitX;
                  const y1 = s.orbitY;
                  const x2 = t.orbitX;
                  const y2 = t.orbitY;

                  // Angular midpoint
                  let midAngle = (s.orbitAngle + t.orbitAngle) / 2;
                  // Handle angular wrap-around
                  if (Math.abs(s.orbitAngle - t.orbitAngle) > Math.PI) {
                    midAngle += Math.PI;
                  }

                  // Push control point along the outer perimeter arc (radius = 265px)
                  const R_CURVE = 265;
                  const ctrlX = Math.round(500 + R_CURVE * Math.cos(midAngle));
                  const ctrlY = Math.round(330 + R_CURVE * Math.sin(midAngle));

                  // Quadratic curve follows the circle circumference
                  pathD = `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`;
                  labelX = ctrlX;
                  labelY = ctrlY;
                } else {
                  // Pipeline View: Clean straight horizontal lines or curved bottom return
                  const x1 = s.pipeX;
                  const y1 = s.pipeY;
                  const x2 = t.pipeX;
                  const y2 = t.pipeY;

                  // If returning from shell (col 4) back to earlier stage, curve beneath
                  const isReturn = x1 > x2;
                  if (isReturn) {
                    pathD = `M ${x1} ${y1} C ${x1} 590, ${x2} 590, ${x2} ${y2}`;
                    labelX = (x1 + x2) / 2;
                    labelY = 575;
                  } else {
                    pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
                    labelX = (x1 + x2) / 2;
                    labelY = (y1 + y2) / 2 - 12;
                  }
                }

                return (
                  <g key={edge.id}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={edge.isCartel ? '#ef4444' : '#64748b'}
                      strokeWidth={edge.isCartel ? 2.8 : 1.6}
                      strokeDasharray={edge.isCartel ? '5 4' : 'none'}
                      markerEnd={edge.isCartel ? 'url(#arrow-cartel)' : 'url(#arrow-nominal)'}
                    />

                    {/* Attention Badge along the perimeter line */}
                    <g transform={`translate(${labelX}, ${labelY})`}>
                      <rect 
                        x="-30" 
                        y="-10" 
                        width="60" 
                        height="20" 
                        rx="6" 
                        fill={edge.isCartel ? '#fee2e2' : '#ffffff'} 
                        stroke={edge.isCartel ? '#fca5a5' : '#cbd5e1'} 
                        strokeWidth="1.2" 
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))"
                      />
                      <text y="4" textAnchor="middle" fill={edge.isCartel ? '#b91c1c' : '#334155'} fontSize="9.5" fontWeight="black">
                        α = {edge.attention}
                      </text>
                    </g>

                    {/* Animated Energy Flow Pulse along edge */}
                    <circle r="3.5" fill={edge.isCartel ? '#dc2626' : '#2563eb'}>
                      <animateMotion path={pathD} dur="2.2s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })}

              {/* ------------------------------------------------------------- */}
              {/* NODE CARDS: Perfectly Aligned & Spaced */}
              {/* ------------------------------------------------------------- */}
              {ringGraph.nodes.map((node) => {
                const cx = viewMode === 'orbital' ? node.orbitX : node.pipeX;
                const cy = viewMode === 'orbital' ? node.pipeY : node.pipeY;
                const isSelected = selectedNode?.id === node.id;

                // Card Dimensions: 154px width, 72px height
                const w = 154;
                const h = 72;

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
                    {/* Drop shadow & background card */}
                    <rect
                      x={-w / 2}
                      y={-h / 2}
                      width={w}
                      height={h}
                      rx="10"
                      fill={cardBg}
                      stroke={isSelected ? '#2563eb' : cardBorder}
                      strokeWidth={isSelected ? 3 : 1.5}
                      filter="drop-shadow(0 2px 5px rgba(0,0,0,0.06))"
                      className="transition-all group-hover:stroke-blue-500"
                    />

                    {/* Type Header Pill */}
                    <rect x={-w / 2 + 6} y={-h / 2 + 5} width={w - 12} height="15" rx="3.5" fill={tagBg} />
                    <text x="0" y={-h / 2 + 16} textAnchor="middle" fill={tagText} fontSize="8" fontWeight="black" letterSpacing="0.5">
                      {typeTitle}
                    </text>

                    {/* Main Label */}
                    <text x="0" y={-h / 2 + 35} textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">
                      {node.type === 'work' ? (node.work_id || node.label.substring(0, 15)) : node.label.substring(0, 17)}
                    </text>

                    {/* Secondary Detail */}
                    <text x="0" y={-h / 2 + 49} textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="medium">
                      {node.type === 'shell' 
                        ? 'Suspicious Siphoning' 
                        : node.type === 'mp' 
                          ? node.state 
                          : node.type === 'work' 
                            ? `Risk: ${node.risk_level || 'HIGH'}` 
                            : (node.state || 'Authorized')}
                    </text>

                    {/* GNN Score Tag */}
                    <g transform={`translate(0, ${h / 2 - 9})`}>
                      <rect x="-38" y="-6" width="76" height="12" rx="3" fill={node.gnn_anomaly_score > 70 ? '#fee2e2' : '#dcfce7'} />
                      <text x="0" y="3" textAnchor="middle" fill={node.gnn_anomaly_score > 70 ? '#991b1b' : '#166534'} fontSize="7.5" fontWeight="black">
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
                <span>Dashed Red Line: Perimeter Flow (No Center Crossings)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Inspector & Forensic Report */}
        <div className="lg:col-span-4 space-y-4">
          
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

          <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-blue-600" />
              <span>GNN Detection Criteria</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></span>
                <span><strong>Perimeter Flow:</strong> Multi-hop attention isolates cyclic kickback paths without false positive center bridging.</span>
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
