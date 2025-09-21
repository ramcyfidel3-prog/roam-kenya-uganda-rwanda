-- First create the admin user profile manually for the admin email
-- We'll handle this in the application code since we can't directly insert into auth.users

-- Create storage bucket for KYC documents (if not exists)
INSERT INTO storage.buckets (id, name, public) VALUES ('kyc-documents', 'kyc-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for KYC documents
CREATE POLICY "Users can upload their own KYC documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'kyc-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own KYC documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'kyc-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- We'll add the admin policy later after the admin user is created