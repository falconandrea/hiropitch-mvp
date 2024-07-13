'use client';

import { useEffect, useState } from 'react';
import { InterfaceTransaction } from '@/lib/interfaces';
import Loading from '@/components/Loading';
import { useUser } from '@clerk/nextjs';
import { getUserByClerkID } from '@/lib/actions/user.actions';
import { getTransactions } from '@/lib/actions/transaction.actions';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function Dashboard() {
  // Get Posts from db
  const [transactions, setTransactions] = useState<InterfaceTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const getUserInfo = async (clerkId: string) => {
      try {
        if (clerkId) {
          const data = await getUserByClerkID(clerkId);
          fetchTransactions(data._id);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    // Fetch data from API
    const fetchTransactions = async (userId: string) => {
      try {
        const data = await getTransactions({ userId }, { createdAt: -1 }, 0);
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching posts:', error);
      }
    };

    setLoading(true);
    getUserInfo(user.id);
  }, [user]);

  return (
    <div>
      {loading && <Loading />}
      {transactions && (
        <table className='w-full'>
          <thead>
            <tr>
              <th className='border-2 border-black px-2 py-1 text-left'>
                Date
              </th>
              <th className='border-2 border-black px-2 py-1 text-left'>
                Idea
              </th>
              <th className='border-2 border-black px-2 py-1 text-left'>
                Action
              </th>
              <th className='border-2 border-black px-2 py-1 text-left'>
                Smart contract
              </th>
              <th className='border-2 border-black px-2 py-1 text-left'>
                Transaction
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: InterfaceTransaction) => (
              <tr key={transaction._id}>
                <td className='border-2 border-black px-2 py-1 text-left'>
                  {formatDate(transaction.createdAt)}
                </td>
                <td className='border-2 border-black px-2 py-1 text-left'>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                    href={`/admin/ideas/${transaction.smartContractId.ideaId._id.toString()}`}
                    title=''
                  >
                    {transaction.smartContractId.ideaId.title}
                  </Link>
                </td>
                <td className='border-2 border-black px-2 py-1 text-left'>
                  {transaction.description}
                </td>
                <td className='border-2 border-black px-2 py-1 text-left'>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                    href={`https://explorer.solana.com/address/${transaction.smartContractId.contractAddress}?cluster=devnet`}
                    title=''
                  >
                    Link
                  </Link>
                </td>
                <td className='border-2 border-black px-2 py-1 text-left'>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                    href={`https://explorer.solana.com/tx/${transaction.hash}?cluster=devnet`}
                    title=''
                  >
                    Link
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
