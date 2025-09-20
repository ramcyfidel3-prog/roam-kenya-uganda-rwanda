import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Upload,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const Profile = () => {
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    dateOfBirth: '1990-01-15',
    idNumber: 'A12345678',
    country: 'Kenya',
    phoneNumber: '+254 700 123 456',
    email: 'john.doe@example.com',
    address: '123 Main Street, Nairobi'
  });

  const countries = [
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'UG', name: 'Uganda', currency: 'UGX' },
    { code: 'TZ', name: 'Tanzania', currency: 'TZS' },
    { code: 'RW', name: 'Rwanda', currency: 'RWF' },
    { code: 'BI', name: 'Burundi', currency: 'BIF' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit KYC data
    setKycStatus('pending');
  };

  const getStatusBadge = () => {
    switch (kycStatus) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="h-4 w-4 mr-1" />
            KYC Verified ✅
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            <Clock className="h-4 w-4 mr-1" />
            KYC Pending Verification
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            <AlertCircle className="h-4 w-4 mr-1" />
            KYC Verification Failed
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Badge */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile & KYC</h1>
          <p className="text-muted-foreground">Manage your account information and verification status</p>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information Form */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={kycStatus === 'verified'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="pl-10"
                    disabled={kycStatus === 'verified'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID/Passport Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="pl-10"
                    disabled={kycStatus === 'verified'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select 
                  value={formData.country} 
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                  disabled={kycStatus === 'verified'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="pl-10"
                    disabled={kycStatus === 'verified'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    disabled={kycStatus === 'verified'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="pl-10"
                    disabled={kycStatus === 'verified'}
                  />
                </div>
              </div>

              {kycStatus !== 'verified' && (
                <Button type="submit" className="w-full btn-hero">
                  Update Profile
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Document Upload & Status */}
        <div className="space-y-6">
          {/* Document Upload */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Identity Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              {kycStatus === 'verified' ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Document Verified</h3>
                  <p className="text-muted-foreground">Your identity document has been successfully verified.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload ID Document</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload a clear photo of your National ID or Passport
                    </p>
                    <Button variant="outline">
                      Choose File
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>• File must be clear and readable</p>
                    <p>• Accepted formats: JPG, PNG, PDF</p>
                    <p>• Maximum file size: 5MB</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* KYC Status Information */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kycStatus === 'verified' ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Identity verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Document approved</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Phone number assigned</span>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <strong>AfriRoam Number:</strong> +254 700 123 456
                      </p>
                    </div>
                  </div>
                ) : kycStatus === 'pending' ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-yellow-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Documents under review</span>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        We'll notify you once verification is complete. This usually takes 1-2 business days.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Verification failed</span>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Please review your documents and try again. Contact support if you need assistance.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Upload New Documents
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;