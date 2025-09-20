import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Smartphone,
  Calendar,
  Filter
} from 'lucide-react';

const Transactions = () => {
  const transactions = [
    {
      id: 'TXN001',
      type: 'purchase',
      description: 'Kenya Pro Plan - 5GB',
      amount: 1200,
      currency: 'KES',
      country: '🇰🇪',
      date: '2024-10-15',
      time: '14:30',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'topup',
      description: 'Wallet Top-up',
      amount: 2000,
      currency: 'KES',
      country: '',
      date: '2024-10-14',
      time: '10:15',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'purchase',
      description: 'Uganda Starter Plan - 1GB',
      amount: 15000,
      currency: 'UGX',
      country: '🇺🇬',
      date: '2024-10-12',
      time: '16:45',
      status: 'completed'
    },
    {
      id: 'TXN004',
      type: 'topup',
      description: 'Wallet Top-up',
      amount: 50000,
      currency: 'UGX',
      country: '',
      date: '2024-10-12',
      time: '16:30',
      status: 'completed'
    },
    {
      id: 'TXN005',
      type: 'purchase',
      description: 'Tanzania Pro Plan - 5GB',
      amount: 6000,
      currency: 'TZS',
      country: '🇹🇿',
      date: '2024-10-08',
      time: '09:20',
      status: 'completed'
    },
    {
      id: 'TXN006',
      type: 'refund',
      description: 'Refund - Unused Plan',
      amount: 800,
      currency: 'KES',
      country: '🇰🇪',
      date: '2024-10-05',
      time: '11:10',
      status: 'completed'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <Smartphone className="h-4 w-4" />;
      case 'topup':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'refund':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'text-red-600';
      case 'topup':
      case 'refund':
        return 'text-green-600';
      default:
        return 'text-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalSpent = transactions
    .filter(t => t.type === 'purchase')
    .reduce((sum, t) => sum + (t.currency === 'KES' ? t.amount : 0), 0);

  const totalTopups = transactions
    .filter(t => t.type === 'topup')
    .reduce((sum, t) => sum + (t.currency === 'KES' ? t.amount : 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">Track your purchases and wallet activity</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Top-ups</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalTopups.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <Smartphone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {transaction.country && <span>{transaction.country}</span>}
                      <p className="font-medium">{transaction.description}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date} • {transaction.time} • {transaction.id}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'purchase' ? '-' : '+'}
                      {transaction.currency} {transaction.amount.toLocaleString()}
                    </p>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Load More Transactions
        </Button>
      </div>
    </div>
  );
};

export default Transactions;