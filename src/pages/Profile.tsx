import { useState, useEffect } from 'react';
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
  AlertCircle,
  Lock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    idNumber: '',
    country: '',
    phoneNumber: '',
    email: '',
    address: ''
  });
  const [kycFile, setKycFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [kycUploading, setKycUploading] = useState(false);

  const countries = [
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'UG', name: 'Uganda', currency: 'UGX' },
    { code: 'TZ', name: 'Tanzania', currency: 'TZS' },
    { code: 'RW', name: 'Rwanda', currency: 'RWF' },
    { code: 'BI', name: 'Burundi', currency: 'BIF' }
  ];

  // Load user profile data on component mount
  useEffect(() => {
    if (user?.profile) {
      setFormData({
        fullName: user.profile.full_name || '',
        dateOfBirth: '',
        idNumber: user.profile.id_number || '',
        country: user.profile.nationality || '',
        phoneNumber: user.profile.phone_number || '',
        email: user.email || '',
        address: ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      await updateProfile({
        full_name: formData.fullName,
        id_number: formData.idNumber,
        nationality: formData.country,
        phone_number: formData.phoneNumber,
      });
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleKycUpload = async () => {
    if (!kycFile || !user) return;
    
    setKycUploading(true);
    try {
      // Upload file to storage
      const fileExt = kycFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('kyc-documents')
        .upload(fileName, kycFile);

      if (uploadError) throw uploadError;

      // Create KYC submission record (using profiles table for now)
      await updateProfile({
        kyc_status: 'pending'
      });

      toast.success('KYC document uploaded successfully! Pending review.');
      setKycFile(null);
    } catch (error: any) {
      toast.error('Failed to upload KYC document');
    } finally {
      setKycUploading(false);
    }
  };

  const getStatusBadge = () => {
    const status = user?.profile?.kyc_status || 'not_submitted';
    
    switch (status) {
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
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <Upload className="h-4 w-4 mr-1" />
            KYC Not Submitted
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
                    disabled={user?.profile?.kyc_status === 'verified'}
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
                    disabled={user?.profile?.kyc_status === 'verified'}
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
                    disabled={user?.profile?.kyc_status === 'verified'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select 
                  value={formData.country} 
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                  disabled={user?.profile?.kyc_status === 'verified'}
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
                    disabled={user?.profile?.kyc_status === 'verified'}
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
                    disabled={user?.profile?.kyc_status === 'verified'}
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
                    disabled={user?.profile?.kyc_status === 'verified'}
                  />
                </div>
              </div>

              {user?.profile?.kyc_status !== 'verified' && (
                <Button type="submit" className="w-full btn-hero" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Profile'}
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
            {user?.profile?.kyc_status === 'verified' ? (
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
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setKycFile(e.target.files?.[0] || null)}
                        className="mb-2"
                      />
                      {kycFile && (
                        <Button 
                          variant="outline" 
                          onClick={handleKycUpload}
                          disabled={kycUploading}
                        >
                          {kycUploading ? 'Uploading...' : 'Upload Document'}
                        </Button>
                      )}
                    </div>
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

          {/* Password Management */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>

          {/* KYC Status Information */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user?.profile?.kyc_status === 'verified' ? (
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
                        <strong>AfriRoam Number:</strong> {user?.profile?.afriroam_number || 'Not assigned yet'}
                      </p>
                    </div>
                  </div>
                ) : user?.profile?.kyc_status === 'pending' ? (
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