"use client";

import { useState, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "Is this contract generator free to use?",
    a: "Yes, the PrestoKit contract generator is completely free. There are no hidden fees, no watermarks, and no account required. Generate as many contracts as you need and download them as PDF at no cost.",
  },
  {
    q: "Are these contracts legally binding?",
    a: "The templates provided are starting points based on common contract language. However, PrestoKit is not a law firm and does not provide legal advice. For important business agreements, we strongly recommend having an attorney review any contract before signing. Laws vary by jurisdiction, and a qualified lawyer can ensure your contract is enforceable in your area.",
  },
  {
    q: "What types of contracts can I generate?",
    a: "We currently offer four contract templates: Freelance Services Agreement (for independent freelancers and clients), Non-Disclosure Agreement (NDA) for protecting confidential information, Independent Contractor Agreement for hiring contractors, and Simple Service Agreement for general business services. Each template includes industry-standard language covering key terms and conditions.",
  },
  {
    q: "Can I customize the contract after generating it?",
    a: "The contract preview shows you exactly what will be generated based on your inputs. You can change any field in the form and the preview updates in real time. After downloading as PDF, you can also edit it further using any PDF editor or copy the text into a word processor for additional customization.",
  },
  {
    q: "What information do I need to fill in?",
    a: "Each contract template requires basic information: your name or company name, the other party's name or company, a description of the services or purpose, payment terms and amounts, and the start and end dates. The more specific you are with the service description and payment terms, the more useful your generated contract will be.",
  },
  {
    q: "How do I send the contract to my client for signing?",
    a: "After downloading the PDF, you can email it to your client as an attachment, share it via cloud storage (Google Drive, Dropbox), or print physical copies. For digital signatures, you can upload the PDF to free e-signature services like DocuSign or HelloSign. Both parties should keep a signed copy for their records.",
  },
];

const RELATED_TOOLS = [
  {
    name: "Invoice Generator",
    description: "Create and download professional invoices as PDF instantly.",
    href: "/tools/invoice-generator",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Invoice Templates",
    description: "Browse 10 professional invoice template designs.",
    href: "/tools/invoice-templates",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
  {
    name: "Estimate Builder",
    description: "Create detailed project estimates and proposals for clients.",
    href: "/tools/estimate-builder",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    name: "Business Name Generator",
    description: "Generate creative business name ideas instantly.",
    href: "/tools/business-name-generator",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
];

/* ------------------------------------------------------------------ */
/*  Contract Types & Templates                                         */
/* ------------------------------------------------------------------ */

type ContractType = "freelance" | "nda" | "contractor" | "service";

interface ContractOption {
  key: ContractType;
  label: string;
  description: string;
  icon: string;
}

const CONTRACT_TYPES: ContractOption[] = [
  { key: "freelance", label: "Freelance Services Agreement", description: "For freelancers providing services to a client", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" },
  { key: "nda", label: "Non-Disclosure Agreement", description: "Protect confidential business information", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { key: "contractor", label: "Independent Contractor Agreement", description: "Hire an independent contractor for a project", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { key: "service", label: "Simple Service Agreement", description: "General agreement for business services", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

interface FormData {
  contractType: ContractType;
  yourName: string;
  yourCompany: string;
  yourAddress: string;
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  serviceDescription: string;
  paymentAmount: string;
  paymentTerms: string;
  startDate: string;
  endDate: string;
  state: string;
}

function todayISO(): string { return new Date().toISOString().split("T")[0]; }
function ninetyDaysISO(): string { const d = new Date(); d.setDate(d.getDate() + 90); return d.toISOString().split("T")[0]; }
function formatDate(iso: string): string { if (!iso) return "___________"; const [y, m, d] = iso.split("-"); return `${m}/${d}/${y}`; }

function defaultForm(): FormData {
  return {
    contractType: "freelance",
    yourName: "",
    yourCompany: "",
    yourAddress: "",
    clientName: "",
    clientCompany: "",
    clientAddress: "",
    serviceDescription: "",
    paymentAmount: "",
    paymentTerms: "Net 30 — Payment due within 30 days of invoice date.",
    startDate: todayISO(),
    endDate: ninetyDaysISO(),
    state: "Utah",
  };
}

/* ------------------------------------------------------------------ */
/*  Contract Text Generators                                           */
/* ------------------------------------------------------------------ */

function generateFreelance(d: FormData): string {
  const provider = d.yourCompany || d.yourName || "[Provider Name]";
  const client = d.clientCompany || d.clientName || "[Client Name]";
  return `FREELANCE SERVICES AGREEMENT

This Freelance Services Agreement ("Agreement") is entered into as of ${formatDate(d.startDate)} ("Effective Date") by and between:

Provider: ${provider}
${d.yourAddress ? `Address: ${d.yourAddress}\n` : ""}${d.yourName && d.yourCompany ? `Contact: ${d.yourName}\n` : ""}
Client: ${client}
${d.clientAddress ? `Address: ${d.clientAddress}\n` : ""}${d.clientName && d.clientCompany ? `Contact: ${d.clientName}\n` : ""}

1. SERVICES
The Provider agrees to perform the following services for the Client ("Services"):

${d.serviceDescription || "[Description of services to be provided]"}

2. TERM
This Agreement shall commence on ${formatDate(d.startDate)} and shall continue until ${formatDate(d.endDate)}, unless terminated earlier in accordance with Section 7 of this Agreement.

3. COMPENSATION
The Client agrees to pay the Provider the total amount of ${d.paymentAmount ? `$${d.paymentAmount}` : "[Amount]"} for the Services described herein.

Payment Terms: ${d.paymentTerms || "[Payment terms]"}

The Provider shall submit invoices to the Client for work completed. The Client shall pay each invoice within the timeframe specified in the payment terms above.

4. INDEPENDENT CONTRACTOR STATUS
The Provider is an independent contractor and not an employee of the Client. The Provider shall be solely responsible for all taxes, insurance, and benefits associated with the compensation received under this Agreement. The Client shall not provide the Provider with employee benefits of any kind.

5. INTELLECTUAL PROPERTY
Upon full payment for the Services, all work product, deliverables, and intellectual property created by the Provider specifically for the Client under this Agreement shall be transferred to and become the sole property of the Client. The Provider retains the right to use general knowledge, skills, and experience gained during the performance of the Services.

6. CONFIDENTIALITY
Both parties agree to keep confidential any proprietary or sensitive information shared during the course of this engagement. This obligation shall survive the termination of this Agreement for a period of two (2) years.

7. TERMINATION
Either party may terminate this Agreement with fourteen (14) days written notice to the other party. Upon termination, the Client shall pay the Provider for all Services completed up to the date of termination. If the Client terminates without cause, the Provider shall be entitled to payment for work completed plus any non-refundable expenses incurred.

8. LIMITATION OF LIABILITY
In no event shall either party be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to this Agreement.

9. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of ${d.state || "[State]"}, without regard to its conflict of laws provisions.

10. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements relating to the subject matter herein. This Agreement may only be amended in writing signed by both parties.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.


_____________________________          _____________________________
${provider}                           ${client}
Provider                               Client

Date: _______________                  Date: _______________`;
}

function generateNDA(d: FormData): string {
  const discloser = d.yourCompany || d.yourName || "[Disclosing Party]";
  const recipient = d.clientCompany || d.clientName || "[Receiving Party]";
  return `NON-DISCLOSURE AGREEMENT (NDA)

This Non-Disclosure Agreement ("Agreement") is entered into as of ${formatDate(d.startDate)} ("Effective Date") by and between:

Disclosing Party: ${discloser}
${d.yourAddress ? `Address: ${d.yourAddress}\n` : ""}
Receiving Party: ${recipient}
${d.clientAddress ? `Address: ${d.clientAddress}\n` : ""}

RECITALS

WHEREAS, the Disclosing Party possesses certain confidential and proprietary information; and

WHEREAS, the Receiving Party desires to receive certain confidential information for the purpose of:

${d.serviceDescription || "[Purpose of disclosure — e.g., evaluating a potential business relationship, project collaboration, etc.]"}

NOW, THEREFORE, in consideration of the mutual promises contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any and all non-public information disclosed by the Disclosing Party to the Receiving Party, whether orally, in writing, electronically, or by any other means, including but not limited to: business plans, financial data, customer lists, trade secrets, technical data, product designs, marketing strategies, software code, proprietary processes, and any other information designated as confidential.

2. OBLIGATIONS OF THE RECEIVING PARTY
The Receiving Party agrees to:
(a) Hold the Confidential Information in strict confidence;
(b) Not disclose the Confidential Information to any third party without prior written consent of the Disclosing Party;
(c) Use the Confidential Information solely for the purpose stated in this Agreement;
(d) Take reasonable measures to protect the secrecy of the Confidential Information, using at least the same degree of care as used to protect its own confidential information;
(e) Limit access to the Confidential Information to those of its employees, agents, or advisors who have a need to know and who are bound by confidentiality obligations at least as restrictive as those in this Agreement.

3. EXCLUSIONS
Confidential Information does not include information that:
(a) Is or becomes publicly available through no fault of the Receiving Party;
(b) Was already in the Receiving Party's possession prior to disclosure, as evidenced by written records;
(c) Is independently developed by the Receiving Party without use of the Confidential Information;
(d) Is rightfully received from a third party without restriction on disclosure;
(e) Is required to be disclosed by law or court order, provided the Receiving Party gives prompt notice to the Disclosing Party.

4. TERM
This Agreement shall commence on the Effective Date and shall continue until ${formatDate(d.endDate)}. The confidentiality obligations under this Agreement shall survive termination for a period of three (3) years from the date of disclosure of each item of Confidential Information.

5. RETURN OF MATERIALS
Upon termination of this Agreement or upon request of the Disclosing Party, the Receiving Party shall promptly return or destroy all materials containing Confidential Information and shall certify in writing that it has done so.

6. NO LICENSE
Nothing in this Agreement grants the Receiving Party any license, right, or interest in or to the Confidential Information, except as expressly set forth herein.

7. REMEDIES
The Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party and that monetary damages may be insufficient. The Disclosing Party shall be entitled to seek injunctive relief in addition to any other remedies available at law or in equity.

8. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of ${d.state || "[State]"}, without regard to its conflict of laws provisions.

9. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof and supersedes all prior agreements, understandings, and communications.


IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.


_____________________________          _____________________________
${discloser}                           ${recipient}
Disclosing Party                       Receiving Party

Date: _______________                  Date: _______________`;
}

function generateContractor(d: FormData): string {
  const company = d.yourCompany || d.yourName || "[Company Name]";
  const contractor = d.clientCompany || d.clientName || "[Contractor Name]";
  return `INDEPENDENT CONTRACTOR AGREEMENT

This Independent Contractor Agreement ("Agreement") is entered into as of ${formatDate(d.startDate)} ("Effective Date") by and between:

Company: ${company}
${d.yourAddress ? `Address: ${d.yourAddress}\n` : ""}${d.yourName && d.yourCompany ? `Contact: ${d.yourName}\n` : ""}
Contractor: ${contractor}
${d.clientAddress ? `Address: ${d.clientAddress}\n` : ""}${d.clientName && d.clientCompany ? `Contact: ${d.clientName}\n` : ""}

1. ENGAGEMENT
The Company hereby engages the Contractor, and the Contractor hereby accepts engagement, to perform the following services ("Services"):

${d.serviceDescription || "[Description of services, deliverables, and project scope]"}

2. TERM
This Agreement shall commence on ${formatDate(d.startDate)} and shall continue until ${formatDate(d.endDate)}, unless terminated earlier in accordance with Section 8 of this Agreement.

3. COMPENSATION
The Company shall pay the Contractor ${d.paymentAmount ? `$${d.paymentAmount}` : "[Amount]"} for the Services described herein.

Payment Terms: ${d.paymentTerms || "[Payment terms]"}

The Contractor shall submit invoices for work completed. The Company shall pay approved invoices within the timeframe specified above.

4. INDEPENDENT CONTRACTOR RELATIONSHIP
(a) The Contractor is an independent contractor and is not an employee, agent, partner, or joint venturer of the Company.
(b) The Contractor shall have no authority to bind the Company or incur any obligation on behalf of the Company.
(c) The Contractor is solely responsible for the payment of all federal, state, and local taxes arising out of the Contractor's activities under this Agreement, including but not limited to income tax, self-employment tax, and any other applicable taxes.
(d) The Contractor shall not be entitled to any benefits provided by the Company to its employees, including but not limited to health insurance, retirement plans, paid time off, or workers' compensation.
(e) The Contractor shall furnish all tools, equipment, and materials necessary to perform the Services, unless otherwise agreed in writing.

5. WORK PRODUCT AND INTELLECTUAL PROPERTY
(a) All work product, deliverables, inventions, and intellectual property created by the Contractor in the performance of the Services ("Work Product") shall be the sole and exclusive property of the Company.
(b) The Contractor hereby assigns to the Company all rights, title, and interest in and to the Work Product, including all intellectual property rights.
(c) The Contractor agrees to execute any documents necessary to perfect the Company's ownership of the Work Product.

6. CONFIDENTIALITY
The Contractor agrees not to disclose, publish, or otherwise reveal any confidential or proprietary information of the Company to any third party during or after the term of this Agreement. This obligation survives termination of this Agreement for a period of two (2) years.

7. NON-SOLICITATION
During the term of this Agreement and for twelve (12) months following its termination, the Contractor shall not directly or indirectly solicit the clients, customers, or employees of the Company for the purpose of providing competing services.

8. TERMINATION
(a) Either party may terminate this Agreement with fourteen (14) days written notice to the other party.
(b) The Company may terminate this Agreement immediately for cause, including but not limited to breach of contract, failure to perform, or violation of confidentiality obligations.
(c) Upon termination, the Company shall pay the Contractor for all Services satisfactorily completed up to the date of termination.

9. INDEMNIFICATION
The Contractor shall indemnify and hold harmless the Company from and against any claims, damages, losses, or expenses arising out of the Contractor's performance of the Services or breach of this Agreement.

10. LIMITATION OF LIABILITY
In no event shall either party be liable for any indirect, incidental, special, consequential, or punitive damages.

11. GOVERNING LAW
This Agreement shall be governed by the laws of the State of ${d.state || "[State]"}.

12. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties. Any modifications must be in writing and signed by both parties.


IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.


_____________________________          _____________________________
${company}                             ${contractor}
Company                                Contractor

Date: _______________                  Date: _______________`;
}

function generateService(d: FormData): string {
  const provider = d.yourCompany || d.yourName || "[Service Provider]";
  const client = d.clientCompany || d.clientName || "[Client Name]";
  return `SIMPLE SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of ${formatDate(d.startDate)} ("Effective Date") by and between:

Service Provider: ${provider}
${d.yourAddress ? `Address: ${d.yourAddress}\n` : ""}${d.yourName && d.yourCompany ? `Contact: ${d.yourName}\n` : ""}
Client: ${client}
${d.clientAddress ? `Address: ${d.clientAddress}\n` : ""}${d.clientName && d.clientCompany ? `Contact: ${d.clientName}\n` : ""}

1. SERVICES
The Service Provider agrees to provide the following services to the Client ("Services"):

${d.serviceDescription || "[Detailed description of services to be provided]"}

The Service Provider shall perform the Services in a professional and workmanlike manner, consistent with generally accepted industry standards.

2. TERM
This Agreement shall be effective from ${formatDate(d.startDate)} through ${formatDate(d.endDate)}, unless terminated earlier as provided herein.

3. COMPENSATION AND PAYMENT
(a) The Client agrees to pay the Service Provider ${d.paymentAmount ? `$${d.paymentAmount}` : "[Amount]"} for the Services described in this Agreement.
(b) Payment Terms: ${d.paymentTerms || "[Payment terms]"}
(c) Late payments shall accrue interest at a rate of 1.5% per month or the maximum rate permitted by law, whichever is less.
(d) The Client shall reimburse the Service Provider for any pre-approved out-of-pocket expenses incurred in the performance of the Services.

4. CLIENT RESPONSIBILITIES
The Client agrees to:
(a) Provide timely access to all information, materials, and resources reasonably necessary for the Service Provider to perform the Services;
(b) Designate a primary contact person for communication regarding this Agreement;
(c) Review and provide feedback on deliverables within five (5) business days of receipt;
(d) Make payments in accordance with the terms set forth in this Agreement.

5. WARRANTIES
The Service Provider warrants that:
(a) The Services will be performed in a professional manner consistent with industry standards;
(b) The Service Provider has the authority to enter into this Agreement;
(c) The Services will not infringe upon the intellectual property rights of any third party.

6. LIMITATION OF LIABILITY
(a) The Service Provider's total liability under this Agreement shall not exceed the total amount paid by the Client under this Agreement.
(b) Neither party shall be liable for any indirect, incidental, special, consequential, or punitive damages.

7. CONFIDENTIALITY
Each party agrees to maintain the confidentiality of the other party's proprietary and confidential information and to not disclose such information to third parties without prior written consent.

8. TERMINATION
(a) Either party may terminate this Agreement with thirty (30) days written notice.
(b) Either party may terminate immediately in the event of a material breach by the other party that remains uncured for fifteen (15) days after written notice.
(c) Upon termination, the Client shall pay for all Services performed and expenses incurred through the date of termination.

9. DISPUTE RESOLUTION
Any disputes arising under this Agreement shall first be addressed through good-faith negotiation between the parties. If the dispute cannot be resolved through negotiation within thirty (30) days, either party may pursue mediation or binding arbitration in accordance with the rules of the American Arbitration Association.

10. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of ${d.state || "[State]"}.

11. MISCELLANEOUS
(a) This Agreement constitutes the entire agreement between the parties.
(b) Any amendments must be in writing and signed by both parties.
(c) If any provision is found to be unenforceable, the remaining provisions shall remain in full force and effect.
(d) Neither party may assign this Agreement without the other party's written consent.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.


_____________________________          _____________________________
${provider}                            ${client}
Service Provider                       Client

Date: _______________                  Date: _______________`;
}

function generateContract(data: FormData): string {
  switch (data.contractType) {
    case "freelance": return generateFreelance(data);
    case "nda": return generateNDA(data);
    case "contractor": return generateContractor(data);
    case "service": return generateService(data);
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContractGeneratorPage() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const printRef = useRef<HTMLDivElement>(null);

  const set = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const contractText = generateContract(form);

  const handlePrint = useCallback(() => { window.print(); }, []);
  const resetForm = useCallback(() => { setForm(defaultForm()); }, []);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#7c6cf0]/60 focus:ring-1 focus:ring-[#7c6cf0]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #contract-print-area, #contract-print-area * { visibility: visible !important; }
          #contract-print-area {
            position: absolute; left: 0; top: 0;
            width: 100%; padding: 0.5in; margin: 0;
            white-space: pre-wrap; font-size: 11pt; line-height: 1.6;
            font-family: 'Times New Roman', Times, serif;
            color: #000;
          }
          @page { margin: 0.5in; size: letter; }
        }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)] print:hidden">
        {/* Breadcrumb */}
        <nav className="border-b border-white/5 bg-[#0e0e18]">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#7c6cf0] transition">PrestoKit</a>
            <span>/</span>
            <a href="/tools" className="hover:text-[#7c6cf0] transition">Tools</a>
            <span>/</span>
            <span className="text-gray-300">Contract Generator</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mx-auto max-w-7xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contract Template Generator
          </h1>
          <p className="mt-2 text-gray-400 max-w-2xl">
            Generate professional business contracts from templates. Fill in your details, preview in real time, and download as PDF. Everything runs in your browser.
          </p>
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-400/90">
            <svg className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>
              <strong>Disclaimer:</strong> These templates are for informational purposes only and do not constitute legal advice. Consult a qualified attorney before using any contract for business purposes.
            </span>
          </div>
        </header>

        {/* Main Grid */}
        <main className="mx-auto max-w-7xl px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: FORM */}
          <div className="space-y-6">
            {/* Contract Type Selector */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Contract Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONTRACT_TYPES.map((ct) => (
                  <button
                    key={ct.key}
                    onClick={() => set("contractType", ct.key)}
                    className={`text-left rounded-xl border p-4 transition-all duration-200 ${
                      form.contractType === ct.key
                        ? "border-[#7c6cf0]/60 bg-[#7c6cf0]/10 shadow-[0_0_20px_rgba(124,108,240,0.1)]"
                        : "border-white/5 bg-[#12121c] hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <svg className={`h-5 w-5 ${form.contractType === ct.key ? "text-[#7c6cf0]" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={ct.icon} />
                      </svg>
                      <span className={`text-sm font-medium ${form.contractType === ct.key ? "text-[#7c6cf0]" : "text-gray-200"}`}>
                        {ct.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-8">{ct.description}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Your Information */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                {form.contractType === "contractor" ? "Your Company" : form.contractType === "nda" ? "Disclosing Party" : "Your Information"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Your Name</label>
                  <input className={inputCls} placeholder="John Smith" value={form.yourName} onChange={(e) => set("yourName", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Company Name</label>
                  <input className={inputCls} placeholder="Acme LLC" value={form.yourCompany} onChange={(e) => set("yourCompany", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Address</label>
                  <input className={inputCls} placeholder="123 Main St, City, State ZIP" value={form.yourAddress} onChange={(e) => set("yourAddress", e.target.value)} />
                </div>
              </div>
            </section>

            {/* Client / Other Party */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                {form.contractType === "contractor" ? "Contractor" : form.contractType === "nda" ? "Receiving Party" : "Client Information"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{form.contractType === "contractor" ? "Contractor Name" : "Contact Name"}</label>
                  <input className={inputCls} placeholder="Jane Doe" value={form.clientName} onChange={(e) => set("clientName", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Company Name</label>
                  <input className={inputCls} placeholder="Client Corp" value={form.clientCompany} onChange={(e) => set("clientCompany", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Address</label>
                  <input className={inputCls} placeholder="456 Business Blvd, City, State ZIP" value={form.clientAddress} onChange={(e) => set("clientAddress", e.target.value)} />
                </div>
              </div>
            </section>

            {/* Service / Purpose Details */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Details</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>
                    {form.contractType === "nda" ? "Purpose of Disclosure" : "Service Description"}
                  </label>
                  <textarea
                    className={inputCls + " min-h-[100px] resize-y"}
                    placeholder={
                      form.contractType === "nda"
                        ? "Describe the purpose — e.g., evaluating a potential business partnership..."
                        : "Describe the services to be provided — e.g., Website design and development including 10 pages, responsive design, and CMS integration..."
                    }
                    value={form.serviceDescription}
                    onChange={(e) => set("serviceDescription", e.target.value)}
                  />
                </div>
                {form.contractType !== "nda" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Payment Amount ($)</label>
                      <input className={inputCls} type="text" placeholder="5,000" value={form.paymentAmount} onChange={(e) => set("paymentAmount", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Payment Terms</label>
                      <input className={inputCls} placeholder="Net 30" value={form.paymentTerms} onChange={(e) => set("paymentTerms", e.target.value)} />
                    </div>
                  </div>
                )}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelCls}>Start Date</label>
                    <input className={inputCls} type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>End Date</label>
                    <input className={inputCls} type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Governing State</label>
                    <input className={inputCls} placeholder="Utah" value={form.state} onChange={(e) => set("state", e.target.value)} />
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-xl bg-[#00e676] px-6 py-3 text-sm font-semibold text-black hover:bg-[#00c864] transition shadow-lg shadow-[#00e676]/20"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                </svg>
                Download PDF
              </button>
              <button
                onClick={resetForm}
                className="rounded-xl border border-white/10 bg-[#1a1a26] px-6 py-3 text-sm font-medium text-gray-300 hover:border-white/20 hover:text-white transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="sticky top-6">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Live Preview</h2>
            <div className="rounded-2xl border border-white/5 bg-white overflow-hidden shadow-2xl shadow-black/40">
              <div
                id="contract-print-area"
                ref={printRef}
                className="p-8 sm:p-10 text-gray-900 text-sm leading-relaxed"
                style={{ fontFamily: "'Times New Roman', Times, serif", whiteSpace: "pre-wrap", maxHeight: "80vh", overflowY: "auto" }}
              >
                {contractText}
              </div>
            </div>
          </div>
        </main>

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Generate a professional contract in three simple steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose Contract Type", desc: "Select from Freelance Services, NDA, Independent Contractor, or Simple Service Agreement. Each template includes industry-standard legal language." },
              { step: "2", title: "Fill In Your Details", desc: "Enter your information, the other party's details, service description, payment terms, and dates. The contract preview updates in real time." },
              { step: "3", title: "Download & Sign", desc: "Review the generated contract, then download as PDF. Print it, email it, or upload it to an e-signature service. Both parties sign to make it official." },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-white/5 bg-[#1a1a26] p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c6cf0]/15 text-[#7c6cf0] text-xl font-bold">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
            Everything you need to know about generating contracts with PrestoKit.
          </p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="mx-auto max-w-7xl px-4 py-16 border-t border-white/5">
          <h2 className="text-2xl font-bold text-center mb-2">Related Tools</h2>
          <p className="text-gray-400 text-center mb-10">More free business tools to help you get things done.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <a key={tool.name} href={tool.href} className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-5 hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c6cf0]/10">
                  <svg className="h-5 w-5 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#7c6cf0] transition-colors">{tool.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/5 bg-[#1a1a26] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1e1e2e] transition-colors"
      >
        <span className="text-sm font-medium text-gray-200 pr-4">{question}</span>
        <svg className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{answer}</div>}
    </div>
  );
}
