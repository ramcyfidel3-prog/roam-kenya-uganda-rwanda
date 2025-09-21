-- Create storage bucket for KYC documents
INSERT INTO storage.buckets (id, name, public) VALUES ('kyc-documents', 'kyc-documents', false);

-- Create storage policies for KYC documents
CREATE POLICY "Users can upload their own KYC documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'kyc-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own KYC documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'kyc-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all KYC documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'kyc-documents' AND EXISTS (
  SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true
));