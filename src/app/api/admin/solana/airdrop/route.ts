import { NextRequest } from 'next/server';
import { requestAirdrop, getBalance } from '@/lib/solana/requestAirdrop';

export async function GET(req: NextRequest) {
  try {
    // Get airdrpo for wallet
    try {
      await requestAirdrop();
    } catch (error) {}

    const balance = await getBalance();
    return Response.json({ balance: balance + ' SOL' }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
