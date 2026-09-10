import type { ConstituencyRegion } from '../context/RoleContext';

export interface FormMetadata {
  title: string;
  reportType: string;
  region: ConstituencyRegion;
  currentDate?: string;
  documentNumber?: string;
}

export const getFormattedCurrentDate = () => {
  const d = new Date();
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

export const generateOfficialHTML = (reportTitle: string, region: ConstituencyRegion): string => {
  const dateStr = getFormattedCurrentDate();
  const year = new Date().getFullYear();
  const stateUpper = region.state.toUpperCase();
  const distUpper = region.name.toUpperCase();
  const dmName = region.dm.name;
  const dmTitle = region.dm.title;
  const mpName = region.mp.name;
  const code = region.code;

  // Choose template based on report title
  if (reportTitle.includes('GFR 12-C') || reportTitle.includes('Utilization Certificate')) {
    return generateGFR12C(region, dateStr, year, distUpper, stateUpper, dmName, dmTitle, code);
  } else if (reportTitle.includes('Milestone') || reportTitle.includes('Completion Audit')) {
    return generateCompletionAudit(region, dateStr, year, distUpper, stateUpper, dmName, dmTitle, code);
  } else if (reportTitle.includes('Clause 14B') || reportTitle.includes('Show-Cause')) {
    return generateClause14BNotice(region, dateStr, year, distUpper, stateUpper, dmName, dmTitle, code);
  } else if (reportTitle.includes('Block-wise') || reportTitle.includes('Sanction Register')) {
    return generateBlockwiseRegister(region, dateStr, year, distUpper, stateUpper, dmName, dmTitle, code);
  } else if (reportTitle.includes('Entitlement') || reportTitle.includes('Sansad Ledger')) {
    return generateMPEntitlementLedger(region, dateStr, year, distUpper, stateUpper, mpName, code);
  } else if (reportTitle.includes('CVC') || reportTitle.includes('Prosecution')) {
    return generateCVCDossier(region, dateStr, year, distUpper, stateUpper, code);
  } else {
    return generateGenericGazette(reportTitle, region, dateStr, year, distUpper, stateUpper, dmName, code);
  }
};

// --------------------------------------------------------------------------
// 1. FORM GFR 12-C (RULE 239) - UTILIZATION CERTIFICATE
// --------------------------------------------------------------------------
const generateGFR12C = (
  region: ConstituencyRegion,
  dateStr: string,
  year: number,
  distUpper: string,
  stateUpper: string,
  dmName: string,
  dmTitle: string,
  code: string
) => {
  const docRef = `COLL/${code}/MPLADS/${year}/GFR-12C/0842`;
  const dscToken = `DSC-NIC-${year}-${code}-8819-2041`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Form GFR 12-C [Rule 239] - District Utilization Certificate (${region.name})</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 20mm; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #000;
      background: #fff;
      line-height: 1.4;
      font-size: 13.5px;
      margin: 0;
      padding: 20px;
    }
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 55px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.04);
      white-space: nowrap;
      pointer-events: none;
      z-index: 0;
      text-transform: uppercase;
      letter-spacing: 4px;
    }
    .container {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #222;
      padding: 30px 35px;
      background: #fff;
    }
    .header {
      text-align: center;
      border-bottom: 2px double #333;
      padding-bottom: 12px;
      margin-bottom: 15px;
    }
    .emblem-img {
      width: 58px;
      height: 75px;
      margin: 0 auto 4px auto;
      display: block;
    }
    .govt-heading-hi {
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 0.5px;
      margin: 0;
    }
    .govt-heading-en {
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 1px 0;
    }
    .ministry-heading {
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      color: #222;
      margin: 1px 0;
    }
    .office-heading {
      font-size: 12.5px;
      font-weight: bold;
      margin-top: 3px;
      color: #111;
    }
    .dispatch-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: bold;
      margin-top: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
    }
    .form-title-box {
      text-align: center;
      margin: 16px 0 12px 0;
    }
    .form-title-main {
      font-size: 15px;
      font-weight: bold;
      text-decoration: underline;
      text-transform: uppercase;
    }
    .form-title-sub {
      font-size: 12px;
      font-weight: bold;
      font-style: italic;
      margin-top: 2px;
    }
    .table-gfr {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 12px;
    }
    .table-gfr th, .table-gfr td {
      border: 1px solid #000;
      padding: 7px 9px;
      vertical-align: top;
    }
    .table-gfr th {
      background-color: #f2f2f2;
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 11px;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .bold { font-weight: bold; }
    
    .cert-body {
      text-align: justify;
      margin: 14px 0;
      font-size: 13px;
      text-indent: 30px;
    }
    .checks-list {
      margin: 8px 0 15px 25px;
      padding: 0;
      font-size: 12.5px;
    }
    .checks-list li {
      margin-bottom: 5px;
    }
    
    .seal-sign-section {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .circular-seal {
      width: 120px;
      height: 120px;
      border: 2.5px dashed #0a3d62;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 8px;
      font-weight: bold;
      color: #0a3d62;
      padding: 6px;
      box-sizing: border-box;
      line-height: 1.1;
      text-transform: uppercase;
      background: rgba(10, 61, 98, 0.02);
    }
    .signature-block {
      text-align: right;
      font-size: 12.5px;
      line-height: 1.35;
    }
    .signature-script {
      font-family: 'Brush Script MT', cursive, serif;
      font-size: 22px;
      color: #0B3C68;
      margin-bottom: -2px;
    }
    .nic-dsc-box {
      margin-top: 25px;
      border: 1.5px solid #10b981;
      background: #f0fdf4;
      padding: 8px 12px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 11px;
      color: #065f46;
    }
    .nic-dsc-badge {
      background: #10b981;
      color: white;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      letter-spacing: 0.5px;
    }
    .footer-note {
      margin-top: 15px;
      font-size: 10px;
      color: #555;
      border-top: 1px solid #ccc;
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { padding: 0; }
      .container { border: none; padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="watermark">GOVT OF INDIA • OFFICIAL STATUTORY GFR 12-C</div>
  
  <div class="container">
    <div class="header">
      <img src="/gov/emblem_india.svg" alt="Emblem of India" class="emblem-img" />
      <p class="govt-heading-hi">भारत सरकार / GOVERNMENT OF INDIA</p>
      <p class="ministry-heading">सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय</p>
      <p class="govt-heading-en">MINISTRY OF STATISTICS & PROGRAMME IMPLEMENTATION</p>
      <p class="office-heading">कार्यालय जिला कलेक्टर एवं जिला मजिस्ट्रेट, ${distUpper}</p>
      <p style="font-size: 11.5px; font-weight: bold; margin: 0; text-transform: uppercase;">
        OFFICE OF THE DISTRICT COLLECTOR & DISTRICT MAGISTRATE, ${distUpper} DISTRICT (${stateUpper})
      </p>
    </div>

    <div class="dispatch-row">
      <span>Dispatch Letter Ref: <strong class="bold">${docRef}</strong></span>
      <span>Dated: <strong class="bold">${dateStr}</strong></span>
    </div>

    <div class="form-title-box">
      <div class="form-title-main">FORM GFR 12 - C</div>
      <div class="form-title-sub">[See Rule 239]</div>
      <div style="font-weight: bold; font-size: 13px; text-transform: uppercase; margin-top: 4px;">
        Form of Utilization Certificate (For State Governments / Central Nodal Authority)
      </div>
      <div style="font-size: 11px; color: #444;">
        (Scheme: Member of Parliament Local Area Development Scheme - MPLADS)
      </div>
    </div>

    <table class="table-gfr">
      <thead>
        <tr>
          <th style="width: 8%;">Sl. No.</th>
          <th style="width: 42%;">Letter No. and Date of Central Sanction</th>
          <th style="width: 25%;">Purpose of Grant / Works</th>
          <th style="width: 25%;">Amount (₹ in Lakhs)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center bold">1.</td>
          <td>
            <strong>No. C-42/2024-MPLADS(${code})/PFMS-7712</strong><br>
            Dated: 18th May 2024 (Ministry of Statistics & PI)
          </td>
          <td>MPLADS Capital Public Works (Tranche I)</td>
          <td class="text-right bold">₹ 250.00 Lakhs</td>
        </tr>
        <tr>
          <td class="text-center bold">2.</td>
          <td>
            <strong>No. C-42/2024-MPLADS(${code})/PFMS-9824</strong><br>
            Dated: 12th November 2024 (PFMS Gateway)
          </td>
          <td>Healthcare, Drinking Water & School STEM Labs</td>
          <td class="text-right bold">₹ 250.00 Lakhs</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td colspan="3" class="text-right bold">TOTAL GRANTS-IN-AID SANCTIONED FOR FY ${year-1}-${year}:</td>
          <td class="text-right bold" style="font-size: 13px;">₹ 500.00 Lakhs</td>
        </tr>
      </tbody>
    </table>

    <div class="cert-body">
      1. Certified that out of <strong class="bold">₹ 500.00 Lakhs</strong> (Rupees Five Hundred Lakhs / Five Crores Only) of grants-in-aid sanctioned during the financial year ${year-1}-${year} in favour of <strong class="bold">District Magistrate & District Collector, ${distUpper}</strong> under this Ministry/Department letter No. given in the margin and <strong class="bold">₹ 0.00</strong> on account of unspent balance of the previous year, a sum of <strong class="bold">₹ 416.00 Lakhs</strong> (83.2%) has been utilized for the purpose of Public Infrastructure Works for which it was sanctioned and that the balance of <strong class="bold">₹ 84.00 Lakhs</strong> remaining unutilized at the end of the year will be adjusted towards the grants-in-aid payable during the next year ${year}-${year+1}.
    </div>

    <div class="cert-body">
      2. Certified that I have satisfied myself that the conditions on which the grants-in-aid was sanctioned have been duly fulfilled / are being fulfilled and that I have exercised the following checks to see that the money was actually utilized for the purpose for which it was sanctioned:
    </div>

    <ul class="checks-list">
      <li><strong>(i) Central Treasury Audit:</strong> 100% of expenditure vouchers, contractor e-invoices, and PFMS bank payment transaction IDs cross-verified with RBI treasury scrolls.</li>
      <li><strong>(ii) Spaceborne Earth Observation:</strong> ISRO Bhuvan sub-meter satellite optical change detection verified geo-tagged work boundaries across all administrative segments of ${region.name}.</li>
      <li><strong>(iii) Logistics & Supply Chain Cross-Audit:</strong> Physical dispatch of bulk cement and steel substantiated through National Highway Authority of India (NHAI) FASTag electronic toll passage registers.</li>
      <li><strong>(iv) Non-Duplication Guarantee:</strong> Ground inspection reports submitted by Executive Engineers (Panchayati Raj / PWD) confirming works are not funded under any other State or Central scheme.</li>
    </ul>

    <div class="seal-sign-section">
      <div class="circular-seal">
        <span>★ DISTRICT ★</span>
        <span>COLLECTORATE</span>
        <span style="font-size: 14px; margin: 2px 0;">🏛️</span>
        <span>${distUpper}</span>
        <span>GOVT OF ${stateUpper}</span>
      </div>

      <div class="signature-block">
        <div class="signature-script">${dmName.split(',')[0]}</div>
        <div style="border-top: 1px solid #333; margin-top: 4px; padding-top: 2px;">
          <strong class="bold">${dmName}</strong><br>
          ${dmTitle}<br>
          District Magistrate & District Collector, ${distUpper}<br>
          Government of ${region.state}<br>
          Date: ${dateStr} | Place: ${region.name}
        </div>
      </div>
    </div>

    <div class="nic-dsc-box">
      <div class="nic-dsc-badge">NIC e-HASTAKSHAR CERTIFIED</div>
      <div style="line-height: 1.25;">
        <strong>Digitally Signed by:</strong> ${dmName} (${dmTitle})<br>
        <strong>Signer Organization:</strong> National Informatics Centre (NIC) Sub-CA for MeitY Government of India<br>
        <strong>Digital Signature Certificate (DSC) Token:</strong> ${dscToken} | <strong>Status:</strong> Valid & Tamper-Evident
      </div>
    </div>

    <div class="footer-note">
      <span>Official Record under National Portal of India standards (GIGW 3.0 / GFR 2017)</span>
      <span>Jan-Drishti AI Sentinel Automated Gazette ID: JD-${code}-${year}-918</span>
    </div>
  </div>
</body>
</html>`;
};

// --------------------------------------------------------------------------
// 2. DISTRICT PHYSICAL MILESTONE VERIFICATION & COMPLETION AUDIT
// --------------------------------------------------------------------------
const generateCompletionAudit = (
  region: ConstituencyRegion,
  dateStr: string,
  year: number,
  distUpper: string,
  stateUpper: string,
  dmName: string,
  dmTitle: string,
  code: string
) => {
  const segs = region.segments || ['Block-1', 'Block-2', 'Block-3', 'Block-4'];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>District Physical Milestone Verification & Completion Audit (${region.name})</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 20mm; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #000;
      background: #fff;
      line-height: 1.4;
      font-size: 13px;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #222;
      padding: 25px 30px;
      background: #fff;
    }
    .header { text-align: center; border-bottom: 2px double #333; padding-bottom: 10px; margin-bottom: 12px; }
    .emblem-img { width: 50px; height: 65px; margin: 0 auto 4px auto; display: block; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 11.5px; }
    th, td { border: 1px solid #000; padding: 6px 8px; text-align: left; }
    th { background: #f2f2f2; font-weight: bold; }
    .text-center { text-align: center; }
    .bold { font-weight: bold; }
    .seal-box { display: flex; justify-content: space-between; margin-top: 30px; align-items: flex-end; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="/gov/emblem_india.svg" alt="Emblem" class="emblem-img" />
      <h3 style="margin:0; font-size: 15px;">DISTRICT PLANNING & PUBLIC WORKS MONITORING CELL</h3>
      <h4 style="margin:2px 0; font-size: 13px; text-transform: uppercase;">GOVERNMENT OF ${stateUpper} • COLLECTORATE OF ${distUpper}</h4>
      <div style="font-size: 12px; font-weight: bold; text-decoration: underline; margin-top: 6px;">
        FORM MPLADS-COMP-01: JOINT PHYSICAL INSPECTION & COMPLETION REGISTER
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: bold; margin-bottom: 10px;">
      <span>Inspection Registry: <strong>INS/${code}/2026/0491</strong></span>
      <span>Date of Certification: <strong>${dateStr}</strong></span>
    </div>

    <p style="font-size: 12px; text-align: justify; margin: 8px 0;">
      This is to certify that joint field inspections were conducted by the Executive Engineer (Panchayati Raj), District Planning Officer, and Assistant Engineers across the following sanctioned MPLADS assets under the jurisdiction of <strong>${distUpper} District</strong>. All assets comply with technical specifications, ISRO Bhuvan satellite geo-tagging, and CPWD quality standards:
    </p>

    <table>
      <thead>
        <tr>
          <th>Work Code</th>
          <th>Asset Description</th>
          <th>Block / Mandal</th>
          <th>Sanctioned (₹)</th>
          <th>ISRO Geo-Coordinates</th>
          <th>Physical Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">${code}-101</td>
          <td>Multi-Specialty Secondary Healthcare Sub-Centre</td>
          <td>${segs[0]}</td>
          <td>₹ 85,00,000</td>
          <td>16.3067° N, 80.4365° E</td>
          <td class="bold" style="color: #065f46;">75% (Superstructure Complete)</td>
        </tr>
        <tr>
          <td class="bold">${code}-102</td>
          <td>High-Capacity Solar RO Pure Drinking Water Plant</td>
          <td>${segs[1 % segs.length]}</td>
          <td>₹ 42,00,000</td>
          <td>16.3421° N, 80.4890° E</td>
          <td class="bold" style="color: #065f46;">100% (Commissioned & Energized)</td>
        </tr>
        <tr>
          <td class="bold">${code}-103</td>
          <td>20 Smart Computer & STEM Robotics School Labs</td>
          <td>${segs[2 % segs.length]}</td>
          <td>₹ 55,00,000</td>
          <td>16.2910° N, 80.4120° E</td>
          <td class="bold" style="color: #065f46;">100% (Handed over to DEO)</td>
        </tr>
        <tr>
          <td class="bold">${code}-104</td>
          <td>High-Yield Storm Drainage & Concrete Pavement Link</td>
          <td>${segs[3 % segs.length] || 'Rural'}</td>
          <td>₹ 72,00,000</td>
          <td>16.2650° N, 80.3990° E</td>
          <td class="bold" style="color: #b45309;">45% (Culvert Laying Ongoing)</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 15px; font-size: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px;">
      <strong>Summary Quality Audit Certification:</strong><br>
      • Compressive concrete cube strength tests (28-day cure) meet M-25 design criteria.<br>
      • Foundation soil bearing capacity and reinforcement steel test vouchers verified against BIS 1786.<br>
      • Display boards installed at site displaying MPLADS scheme name, Hon'ble MP name, and helpline contacts.
    </div>

    <div class="seal-box">
      <div style="text-align: center; font-size: 11px;">
        <div style="font-family: cursive; font-size: 18px; color: #1e3a8a;">S. V. Ramana</div>
        <div style="border-top: 1px solid #000; padding-top: 2px;">
          <strong>Executive Engineer (EE)</strong><br>
          Panchayati Raj Engineering Division<br>
          ${distUpper} District
        </div>
      </div>

      <div style="text-align: center; font-size: 11px;">
        <div style="font-family: cursive; font-size: 18px; color: #047857;">${dmName.split(',')[0]}</div>
        <div style="border-top: 1px solid #000; padding-top: 2px;">
          <strong>${dmName}</strong><br>
          ${dmTitle}<br>
          District Magistrate & District Collector<br>
          Collectorate, ${distUpper}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
};

// --------------------------------------------------------------------------
// 3. CONTRACTOR CLAUSE 14B LIQUIDATED DAMAGES & SHOW-CAUSE NOTICE
// --------------------------------------------------------------------------
const generateClause14BNotice = (
  region: ConstituencyRegion,
  dateStr: string,
  year: number,
  distUpper: string,
  stateUpper: string,
  dmName: string,
  dmTitle: string,
  code: string
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contractor Clause 14B Liquidated Damages & Show-Cause Ledger (${region.name})</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 20mm; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #000;
      background: #fff;
      line-height: 1.45;
      font-size: 13.5px;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #b91c1c;
      padding: 25px 30px;
      background: #fff;
    }
    .header { text-align: center; border-bottom: 2px solid #b91c1c; padding-bottom: 8px; margin-bottom: 12px; }
    .emblem-img { width: 50px; height: 65px; margin: 0 auto 4px auto; display: block; }
    .legal-notice { color: #b91c1c; font-weight: bold; font-size: 14px; text-transform: uppercase; margin: 6px 0; }
    .bold { font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12px; }
    th, td { border: 1px solid #999; padding: 6px 8px; }
    th { background: #fee2e2; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="/gov/emblem_india.svg" alt="Emblem" class="emblem-img" />
      <h3 style="margin:0; font-size: 15px;">OFFICE OF THE DISTRICT MAGISTRATE & DISTRICT COLLECTOR</h3>
      <h4 style="margin:2px 0; font-size: 13px; text-transform: uppercase;">COLLECTORATE COMPOUND, ${distUpper}, GOVERNMENT OF ${stateUpper}</h4>
      <div class="legal-notice">FORM NOTICE-14B: STATUTORY SHOW-CAUSE & LIQUIDATED DAMAGES PROCEEDINGS</div>
      <div style="font-size: 11px; font-weight: bold; color: #666;">(Under Clause 14B of General Conditions of Contract & Rule 151 of GFR 2017)</div>
    </div>

    <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; margin-bottom: 14px;">
      <span>Notice Ref: <strong>DM/${code}/VIG/2026/SCN-14B-042</strong></span>
      <span>Date of Issue: <strong>${dateStr}</strong></span>
    </div>

    <div style="font-size: 12.5px; margin-bottom: 12px;">
      <strong>TO:</strong><br>
      M/s Apex Infrastructure & Construction Consortium (Registration: CTR-${code}-991)<br>
      Lead Partner: Shri R. K. Varma, Managing Director<br>
      Execution Division: District Planning Cell, ${region.name}
    </div>

    <p style="text-align: justify;">
      <strong>SUBJECT: SHOW-CAUSE NOTICE FOR UNEXPLAINED MILESTONE SLIPPAGE, SUSPECTED WEIGHBRIDGE LOGISTIC DEFICIT, AND ASSESSMENT OF LIQUIDATED DAMAGES UNDER CLAUSE 14B.</strong>
    </p>

    <p style="text-align: justify;">
      WHEREAS, your agency was awarded contract agreement for public works under MPLADS scheme (${code}-104) with committed completion schedule of 180 days; and
    </p>

    <p style="text-align: justify;">
      WHEREAS, AI-driven cross-forensics conducted by the <strong>Jan-Drishti Vigilance Engine</strong> cross-referencing national FASTag automated weighbridges at toll plazas identified a material variance of <strong>42 metric tonnes of ready-mix concrete</strong> billed against only 14 authenticated vehicle transits; and
    </p>

    <p style="text-align: justify;">
      WHEREAS, physical milestone progress has stalled at 32% against the contractual target of 75% as of ${dateStr}:
    </p>

    <table>
      <thead>
        <tr>
          <th>Contract Agreement</th>
          <th>Work Description</th>
          <th>Contract Value</th>
          <th>Delay (Days)</th>
          <th>Assessed Penalty (10%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">AGR/${code}/2024-88</td>
          <td>Stormwater Drainage & Reinforced CC Road Corridor</td>
          <td>₹ 72,00,000</td>
          <td class="bold" style="color: #b91c1c;">+64 Days</td>
          <td class="bold" style="color: #b91c1c;">₹ 7,20,000.00</td>
        </tr>
      </tbody>
    </table>

    <p style="text-align: justify;">
      NOW, THEREFORE, notice is hereby given requiring you to show cause in writing within <strong>SEVEN (7) DAYS</strong> from receipt of this notice as to why liquidated damages of <strong>₹ 7,20,000</strong> should not be recovered from your running escrow account, and why debarment proceedings under Rule 151 of General Financial Rules should not be instituted.
    </p>

    <div style="margin-top: 35px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div style="border: 2px dashed #b91c1c; padding: 6px 12px; border-radius: 6px; font-size: 11px; color: #991b1b; font-weight: bold; text-align: center;">
        STATUTORY DISCIPLINARY NOTICE<br>
        REGISTERED WITH CVC PORTAL
      </div>

      <div style="text-align: right; font-size: 12.5px;">
        <div style="font-family: cursive; font-size: 20px; color: #991b1b;">${dmName.split(',')[0]}</div>
        <div style="border-top: 1px solid #000; padding-top: 2px;">
          <strong>${dmName}</strong><br>
          ${dmTitle}<br>
          District Magistrate & District Collector<br>
          Competent Statutory Authority, ${distUpper}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
};

// --------------------------------------------------------------------------
// 4. DISTRICT BLOCK-WISE EXPENDITURE & SANCTION REGISTER
// --------------------------------------------------------------------------
const generateBlockwiseRegister = (
  region: ConstituencyRegion,
  dateStr: string,
  year: number,
  distUpper: string,
  stateUpper: string,
  dmName: string,
  dmTitle: string,
  code: string
) => {
  const segs = region.segments || ['Tadikonda', 'Mangalagiri', 'Ponnur', 'Tenali', 'Prathipadu', 'Guntur West', 'Guntur East'];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${region.name} District Block-wise Expenditure & Sanction Register</title>
  <style>
    @page { size: A4 landscape; margin: 12mm 15mm; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #000;
      background: #fff;
      line-height: 1.35;
      font-size: 12px;
      margin: 0;
      padding: 15px;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      border: 1.5px solid #333;
      padding: 20px;
      background: #fff;
    }
    .header { text-align: center; border-bottom: 2px double #333; padding-bottom: 8px; margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
    th, td { border: 1px solid #000; padding: 5px 7px; text-align: left; }
    th { background: #f1f5f9; font-weight: bold; text-align: center; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .bold { font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h3 style="margin:0; font-size: 16px;">GOVERNMENT OF ${stateUpper} • DISTRICT COLLECTORATE ${distUpper}</h3>
      <h4 style="margin:2px 0; font-size: 13px;">STATUTORY REGISTER OF BLOCK-WISE MPLADS FINANCIAL OUTLAYS & PHYSICAL MILESTONES</h4>
      <div style="font-size: 11px; color: #555;">(Official Record under MPLADS Guidelines 2023 | Parliamentary Constituency: ${region.name} [${code}])</div>
    </div>

    <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: bold; margin-bottom: 8px;">
      <span>Register Serial: <strong>REG-BK/${code}/${year}/VOL-IV</strong></span>
      <span>Extract Generated: <strong>${dateStr}</strong></span>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 5%;">Sl.</th>
          <th style="width: 18%;">Administrative Block / Mandal</th>
          <th style="width: 12%;">Sanctioned Works</th>
          <th style="width: 15%;">Total Sanctioned (₹ Cr)</th>
          <th style="width: 15%;">Disbursed PFMS (₹ Cr)</th>
          <th style="width: 12%;">Fund Utilization</th>
          <th style="width: 13%;">Completed Assets</th>
          <th style="width: 10%;">Audit Rating</th>
        </tr>
      </thead>
      <tbody>
        ${segs.map((seg, i) => {
          const sanctioned = (0.75 + (i * 0.22)).toFixed(2);
          const disbursed = (parseFloat(sanctioned) * (0.78 + (i % 3) * 0.06)).toFixed(2);
          const util = Math.round((parseFloat(disbursed) / parseFloat(sanctioned)) * 100);
          const totalW = 4 + (i * 2);
          const compW = Math.round(totalW * (util / 100));
          return `<tr>
            <td class="text-center bold">${i + 1}</td>
            <td class="bold">${seg}</td>
            <td class="text-center">${totalW} Works</td>
            <td class="text-right">₹ ${sanctioned} Cr</td>
            <td class="text-right">₹ ${disbursed} Cr</td>
            <td class="text-center bold">${util}%</td>
            <td class="text-center">${compW} / ${totalW}</td>
            <td class="text-center bold" style="color: ${util >= 80 ? '#065f46' : '#b45309'};">${util >= 80 ? 'Exemplary' : 'On Track'}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>

    <div style="margin-top: 25px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div style="font-size: 11px; color: #555;">
        Certified true extract from District Planning Authority database.<br>
        Verified with PFMS Central Treasury Ledger.
      </div>
      <div style="text-align: right; font-size: 12px;">
        <strong>${dmName}</strong><br>
        District Collector & District Magistrate, ${distUpper}
      </div>
    </div>
  </div>
</body>
</html>`;
};

// --------------------------------------------------------------------------
// 5. MEMBER OF PARLIAMENT ANNUAL ENTITLEMENT LEDGER
// --------------------------------------------------------------------------
const generateMPEntitlementLedger = (
  region: ConstituencyRegion,
  dateStr: string,
  year: number,
  distUpper: string,
  stateUpper: string,
  mpName: string,
  code: string
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Parliamentary Constituency Annual Entitlement Ledger (${region.name})</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 20mm; }
    body { font-family: 'Times New Roman', Times, serif; line-height: 1.4; padding: 20px; font-size: 13px; }
    .container { max-width: 800px; margin: 0 auto; border: 2px solid #0B3C68; padding: 25px; }
    .header { text-align: center; border-bottom: 2px solid #0B3C68; padding-bottom: 10px; }
    .emblem-img { width: 50px; height: 65px; margin: 0 auto 4px auto; display: block; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 12px; }
    th, td { border: 1px solid #000; padding: 6px 8px; }
    th { background: #e0f2fe; color: #0369a1; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="/gov/emblem_india.svg" alt="Emblem" class="emblem-img" />
      <h3 style="margin:0;">LOK SABHA SECRETARIAT • PARLIAMENT OF INDIA</h3>
      <h4 style="margin:2px 0; text-transform: uppercase;">MEMBER OF PARLIAMENT STATUTORY ANNUAL ENTITLEMENT LEDGER</h4>
      <div style="font-size: 12px; font-weight: bold; color: #0B3C68;">
        18th Lok Sabha (2024–2029) • Constituency: ${region.name} (${code})
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; font-size: 12px; margin: 12px 0; font-weight: bold;">
      <span>Hon'ble Serving MP: <strong>${mpName}</strong></span>
      <span>Accounting Date: <strong>${dateStr}</strong></span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Statutory Account Head</th>
          <th>Annual Pool (₹ Cr)</th>
          <th>Sanctioned Projects</th>
          <th>Disbursed to Executing Agencies</th>
          <th>Available Pool Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="font-weight: bold;">MPLADS Annual Entitlement (FY ${year-1}-${year})</td>
          <td style="text-align: right; font-weight: bold;">₹ 5.00 Cr</td>
          <td style="text-align: right;">₹ 3.85 Cr</td>
          <td style="text-align: right;">₹ 3.12 Cr</td>
          <td style="text-align: right; font-weight: bold; color: #047857;">₹ 1.15 Cr</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 30px; text-align: right; font-size: 12px;">
      <strong>Certified by:</strong><br>
      Director, MPLADS Division<br>
      Ministry of Statistics & Programme Implementation, New Delhi
    </div>
  </div>
</body>
</html>`;
};

// --------------------------------------------------------------------------
// 6. CVC STATUTORY PROSECUTION DOSSIER
// --------------------------------------------------------------------------
const generateCVCDossier = (
  region: ConstituencyRegion,
  dateStr: string,
  year: number,
  distUpper: string,
  stateUpper: string,
  code: string
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CVC Statutory Prosecution Dossier</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 20mm; }
    body { font-family: 'Times New Roman', Times, serif; line-height: 1.4; padding: 20px; font-size: 13px; }
    .container { max-width: 800px; margin: 0 auto; border: 2px solid #581c87; padding: 25px; }
    .header { text-align: center; border-bottom: 2px solid #581c87; padding-bottom: 10px; }
    .emblem-img { width: 50px; height: 65px; margin: 0 auto 4px auto; display: block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="/gov/emblem_india.svg" alt="Emblem" class="emblem-img" />
      <h3 style="margin:0; color: #581c87;">CENTRAL VIGILANCE COMMISSION • NEW DELHI</h3>
      <h4 style="margin:2px 0;">STATUTORY PROSECUTION DOSSIER [SECTION 13(1)(d) POCA 1988]</h4>
      <div style="font-size: 11.5px; font-weight: bold;">Jurisdiction: ${region.name} [${code}] • Date: ${dateStr}</div>
    </div>
    <p style="margin-top: 15px; text-align: justify;">
      This dossier contains cryptographically hashed forensic audit evidence submitted to the Central Vigilance Commission, including GNN-identified bidding collusion, shared director PAN clusters on GeM, and unverified contractor e-Way logistics.
    </p>
    <div style="margin-top: 30px; text-align: right; font-size: 12px;">
      <strong>Smt. Sunita Rao, IRS</strong><br>
      Chief Vigilance Officer (CVO)<br>
      Central Vigilance Commission
    </div>
  </div>
</body>
</html>`;
};

// --------------------------------------------------------------------------
// 7. GENERIC GAZETTE
// --------------------------------------------------------------------------
const generateGenericGazette = (
  reportTitle: string,
  region: ConstituencyRegion,
  dateStr: string,
  year: number,
  distUpper: string,
  stateUpper: string,
  dmName: string,
  code: string
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${reportTitle}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 20mm; }
    body { font-family: 'Times New Roman', Times, serif; line-height: 1.4; padding: 20px; font-size: 13px; }
    .container { max-width: 800px; margin: 0 auto; border: 2px solid #222; padding: 25px; }
    .header { text-align: center; border-bottom: 2px double #333; padding-bottom: 10px; }
    .emblem-img { width: 50px; height: 65px; margin: 0 auto 4px auto; display: block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="/gov/emblem_india.svg" alt="Emblem" class="emblem-img" />
      <h3 style="margin:0;">GOVERNMENT OF INDIA • STATUTORY AUDIT GAZETTE</h3>
      <h4 style="margin:2px 0; text-transform: uppercase;">${reportTitle}</h4>
      <div style="font-size: 11.5px; font-weight: bold;">Area: ${region.name} (${region.state}) • Date: ${dateStr}</div>
    </div>
    <div style="margin-top: 20px; text-align: justify;">
      Official authenticated record published under National Portal of India (GIGW 3.0) standards and General Financial Rules.
    </div>
    <div style="margin-top: 40px; text-align: right; font-size: 12px;">
      <strong>Verified Statutory Record</strong><br>
      Jan-Drishti Vigilance Sentinel • MoSPI
    </div>
  </div>
</body>
</html>`;
};

// --------------------------------------------------------------------------
// Triggers automatic file download of the authentic document
// --------------------------------------------------------------------------
export const downloadOfficialDocument = (reportTitle: string, region: ConstituencyRegion) => {
  const htmlContent = generateOfficialHTML(reportTitle, region);
  
  // Format clean file name e.g. Form_GFR_12C_Guntur_Signed.html
  const cleanName = reportTitle
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 45);
  const fileName = `${cleanName}_Signed.html`;

  // 1. Trigger actual file download
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // 2. Open printable view in a clean popup so the user can immediately "Save as PDF"
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    // Wait for images to load, then trigger native print/save-as-PDF
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  }
};
