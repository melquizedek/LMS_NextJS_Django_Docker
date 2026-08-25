import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const getGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const SYSTEM_PROMPT = `You are "ZedAI", the expert Financial & Lending Intelligence Advisor for ZedLendingCorp (a premier licensed financing corporation based in Makati City, Metro Manila, Philippines).

Your objective is to provide institutional-grade financial guidance, loan product explanations, credit risk assessment insights, and prudent borrowing strategies to help consumers, pensioners, and business owners make smart, safe financial decisions.

All monetary references must be in Philippine Peso (₱ / PHP).

---
### YOUR CORE EXPERTISE & DOMAIN KNOWLEDGE:
1. **ZedLendingCorp Financing Products:**
   - **Personal & Pension Loan**: ₱10,000 - ₱500,000 | 6 - 60 mos | From 5.99% APR | 1.0% fee | Instant / Same-day release. Ideal for SSS/GSIS pensioners, tuition, home renovation, or debt consolidation. No co-maker required.
   - **Business Expansion Loan**: ₱100,000 - ₱5,000,000 | 12 - 120 mos | From 6.75% APR | 1.25% fee | 1-2 days turnaround. Minimum 1 yr registered DTI/SEC business operations, >₱800k annual gross.
   - **SME Working Capital**: ₱50,000 - ₱1,500,000 | 3 - 36 mos | From 6.25% APR | 1.0% fee | 24-hr turnaround. For supplier invoices, payroll bridge, seasonal inventory.
   - **Emergency Cash Loan**: ₱5,000 - ₱100,000 | 3 - 24 mos | From 7.49% APR | 0.5% fee | Fast 2-4 hours via InstaPay/GCash/Maya. For medical, emergency repairs.
   - **Auto & Vehicle Financing**: ₱100,000 - ₱2,500,000 | 12 - 84 mos | From 4.85% APR | 0.75% fee | New/used cars or refinancing.
   - **Home & Real Estate Financing**: ₱200,000 - ₱5,000,000 | 24 - 180 mos | From 5.45% APR | 1.0% fee | Real estate collateral (clean TCT/CCT).

2. **Credit Assessment & Underwriting Analysis (The 5 Cs of Credit):**
   - **Character**: Credit history, repayment reputation, verifiable stability.
   - **Capacity**: Debt-to-Income (DTI) ratio. Safe benchmark: monthly debt payments should not exceed 35% - 40% of gross monthly income. Calculate Net Disposable Income (NDI).
   - **Capital**: Liquid savings, retained earnings for businesses.
   - **Collateral**: Real estate (TCT), vehicle OR/CR, or receivables when required.
   - **Conditions**: Economic climate, industry trends, and the specific purpose of the loan.

3. **Strategic Borrowing & Financial Management:**
   - **Debt Consolidation**: Combining multiple high-interest credit card debts (typically 24% - 36% APR) into a single lower-rate fixed term loan (e.g. 5.99% APR) to slash monthly cash drain and accelerate payoff.
   - **Tenure Optimization**: Balancing lower monthly installments (longer tenure) versus minimizing total lifetime interest charges (shorter tenure).
   - **Cash Flow Safeguards**: Avoiding predatory 5-6 lending traps; always inspecting the Effective Interest Rate (EIR) and SEC licensing.
   - **Eligibility & Verification**: Advise applicants on preparing essential documentation (2 Valid Government IDs, Proof of Billing, 3-6 mos Bank Statements/Payslips, DTI/SEC registration & Mayor's permit for businesses).

4. **Tone & Formatting:**
   - Professional, warm, transparent, and encouraging.
   - Use clear markdown with bold highlights, bullet points, and concise amortization formulas when calculations are requested.
   - If the user provides loan amounts, calculate realistic monthly estimates and explain the total repayment clearly.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, userProfile } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1].content;
    const ai = getGemini();

    if (ai) {
      const formattedContents: Array<{
        role: string;
        parts: Array<{ text: string }>;
      }> = [];

      for (const msg of messages.slice(0, -1)) {
        formattedContents.push({
          role:
            msg.role === 'assistant' || msg.role === 'model'
              ? 'model'
              : 'user',
          parts: [{ text: msg.content }],
        });
      }

      formattedContents.push({
        role: 'user',
        parts: [{ text: lastMessage }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: formattedContents,
        config: {
          systemInstruction:
            SYSTEM_PROMPT +
            (userProfile
              ? `\n\nActive User Profile Context: ${JSON.stringify(userProfile)}`
              : ''),
          temperature: 0.7,
          topP: 0.95,
        },
      });

      const replyText =
        response.text ||
        'I apologize, but I could not generate a response. How can I assist you with your financing needs today?';
      return NextResponse.json({ reply: replyText });
    } else {
      const lower = lastMessage.toLowerCase();
      let fallbackReply = '';

      if (
        lower.includes('pension') ||
        lower.includes('senior') ||
        lower.includes('sss') ||
        lower.includes('gsis')
      ) {
        fallbackReply = `### 📋 Personal & Pension Loan Overview\n\nZedLendingCorp offers dedicated financing for **SSS and GSIS pensioners** and salaried professionals with fast, dignified processing.\n\n- **Loan Amount Range:** ₱10,000 to ₱500,000\n- **Interest Rate:** Fixed from **5.99% APR**\n- **Repayment Terms:** 6 to 60 months\n- **Turnaround:** Same-day instant release via bank account, GCash, or Maya\n\n**Requirements:**\n1. 2 Valid Government IDs\n2. SSS/GSIS Pension Voucher / Proof of monthly pension (min. ₱15,000/mo)\n3. Proof of Billing (e.g. Meralco, Maynilad, Telecom)\n\nWould you like to calculate your monthly amortization or start an application?`;
      } else if (
        lower.includes('business') ||
        lower.includes('sme') ||
        lower.includes('working capital')
      ) {
        fallbackReply = `### 🏢 Business & SME Expansion Financing\n\nWe provide tailored capital facilities to fuel inventory, equipment purchases, and branch growth:\n\n- **SME Working Capital:** ₱50,000 to ₱1,500,000 (3 - 36 months, 6.25% APR)\n- **Business Expansion Facility:** ₱100,000 to ₱5,000,000 (12 - 120 months, 6.75% APR)\n\n**Key Advantages:**\n- Fast approval within 24–48 hours\n- Flexible amortization matching seasonal cash flow\n- Zero hidden fees\n\n**Eligibility:** At least 1 year in registered DTI / SEC operations with ₱50k+ monthly turnover.`;
      } else if (
        lower.includes('calculate') ||
        lower.includes('amortization') ||
        lower.includes('100,000') ||
        lower.includes('50,000') ||
        lower.includes('monthly')
      ) {
        fallbackReply = `### 🧮 Sample Loan Calculation Simulation\n\nHere is an estimated amortization breakdown for a **₱100,000 Personal Loan** at **5.99% annual interest**:\n\n| Tenure | Estimated Monthly Payment | Total Interest Paid | Total Repayment |\n| :--- | :--- | :--- | :--- |\n| **12 Months** | ₱8,606 / mo | ₱3,272 | ₱103,272 |\n| **24 Months** | ₱4,432 / mo | ₱6,368 | ₱106,368 |\n| **36 Months** | ₱3,042 / mo | ₱9,512 | ₱109,512 |\n\n*Note: A one-time processing fee of 1.0% (₱1,000) applies upon disbursement.*`;
      } else if (
        lower.includes('dti') ||
        lower.includes('debt') ||
        lower.includes('score') ||
        lower.includes('capacity')
      ) {
        fallbackReply = `### 📊 Understanding Debt-to-Income (DTI) & Credit Capacity\n\nYour **Debt-to-Income (DTI) ratio** measures what percentage of your gross monthly income goes toward existing debt payments.\n\n$$\\text{DTI} = \\frac{\\text{Total Monthly Debt Obligations}}{\\text{Gross Monthly Income}} \\times 100$$\n\n- **Ideal DTI (Under 35%):** Healthy borrowing capacity with fast approval.\n- **Moderate DTI (36% - 43%):** Manageable, suitable for structured consolidation.\n- **High DTI (Over 44%):** We recommend debt consolidation to lower your monthly outflow before taking on new principal.`;
      } else {
        fallbackReply = `### 🌟 Welcome to ZedAI Financial & Lending Advisory\n\nI am your specialized AI lending expert at **ZedLendingCorp**. How can I help you today?\n\n- 💰 **Loan Products & Rates** (Personal, Pension, SME, Emergency, Auto, Real Estate)\n- 🧮 **Custom Amortization Simulations** (Give me an amount and tenure!)\n- 📈 **Credit Health & DTI Assessment**\n- 🛡️ **Debt Consolidation & Borrowing Strategies**\n- 📝 **Application Requirements & Eligibility**`;
      }

      return NextResponse.json({ reply: fallbackReply });
    }
  } catch (error: unknown) {
    console.error('Error in /api/chat:', error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      {
        error: 'Failed to process AI chat request',
        details: message,
      },
      { status: 500 }
    );
  }
}
