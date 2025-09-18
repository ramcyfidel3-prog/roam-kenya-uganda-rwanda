-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  nationality TEXT,
  id_number TEXT,
  phone_number TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
  afriroam_number TEXT UNIQUE,
  wallet_balance DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create countries table for East African countries
CREATE TABLE public.countries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  flag_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create esim_products table for different data packages
CREATE TABLE public.esim_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  data_amount TEXT NOT NULL, -- e.g., "1GB", "5GB", "Unlimited"
  validity_days INTEGER NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  includes_calls BOOLEAN DEFAULT false,
  includes_sms BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table for eSIM purchases
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.esim_products(id) ON DELETE CASCADE NOT NULL,
  qr_code TEXT,
  manual_code TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create device_compatibility table
CREATE TABLE public.device_compatibility (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  os_type TEXT NOT NULL CHECK (os_type IN ('iOS', 'Android')),
  is_supported BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esim_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.device_compatibility ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for countries (public read)
CREATE POLICY "Anyone can view countries" ON public.countries
  FOR SELECT USING (true);

-- Create RLS policies for esim_products (public read)
CREATE POLICY "Anyone can view active products" ON public.esim_products
  FOR SELECT USING (is_active = true);

-- Create RLS policies for purchases
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases" ON public.purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for device_compatibility (public read)
CREATE POLICY "Anyone can view device compatibility" ON public.device_compatibility
  FOR SELECT USING (true);

-- Insert East African countries
INSERT INTO public.countries (name, code, flag_url) VALUES
('Kenya', 'KE', '🇰🇪'),
('Tanzania', 'TZ', '🇹🇿'),
('Uganda', 'UG', '🇺🇬'),
('Rwanda', 'RW', '🇷🇼'),
('Burundi', 'BI', '🇧🇮'),
('South Sudan', 'SS', '🇸🇸'),
('Ethiopia', 'ET', '🇪🇹'),
('Somalia', 'SO', '🇸🇴'),
('Democratic Republic of Congo', 'CD', '🇨🇩'),
('Eritrea', 'ER', '🇪🇷'),
('Djibouti', 'DJ', '🇩🇯');

-- Insert sample eSIM products for each country
INSERT INTO public.esim_products (country_id, name, data_amount, validity_days, price, includes_calls, includes_sms) 
SELECT 
  c.id,
  'Starter Plan',
  '1GB',
  7,
  9.99,
  false,
  false
FROM public.countries c;

INSERT INTO public.esim_products (country_id, name, data_amount, validity_days, price, includes_calls, includes_sms) 
SELECT 
  c.id,
  'Pro Plan',
  '5GB',
  30,
  24.99,
  true,
  true
FROM public.countries c;

INSERT INTO public.esim_products (country_id, name, data_amount, validity_days, price, includes_calls, includes_sms) 
SELECT 
  c.id,
  'Unlimited Plan',
  'Unlimited',
  30,
  49.99,
  true,
  true
FROM public.countries c;

-- Insert device compatibility data
INSERT INTO public.device_compatibility (brand, model, os_type, is_supported) VALUES
-- iOS devices
('Apple', 'iPhone SE (2020)', 'iOS', true),
('Apple', 'iPhone SE (2022)', 'iOS', true),
('Apple', 'iPhone XR', 'iOS', true),
('Apple', 'iPhone XS', 'iOS', true),
('Apple', 'iPhone XS Max', 'iOS', true),
('Apple', 'iPhone 11', 'iOS', true),
('Apple', 'iPhone 11 Pro', 'iOS', true),
('Apple', 'iPhone 11 Pro Max', 'iOS', true),
('Apple', 'iPhone 12 mini', 'iOS', true),
('Apple', 'iPhone 12', 'iOS', true),
('Apple', 'iPhone 12 Pro', 'iOS', true),
('Apple', 'iPhone 12 Pro Max', 'iOS', true),
('Apple', 'iPhone 13 mini', 'iOS', true),
('Apple', 'iPhone 13', 'iOS', true),
('Apple', 'iPhone 13 Pro', 'iOS', true),
('Apple', 'iPhone 13 Pro Max', 'iOS', true),
('Apple', 'iPhone 14', 'iOS', true),
('Apple', 'iPhone 14 Plus', 'iOS', true),
('Apple', 'iPhone 14 Pro', 'iOS', true),
('Apple', 'iPhone 14 Pro Max', 'iOS', true),
('Apple', 'iPhone 15', 'iOS', true),
('Apple', 'iPhone 15 Plus', 'iOS', true),
('Apple', 'iPhone 15 Pro', 'iOS', true),
('Apple', 'iPhone 15 Pro Max', 'iOS', true),
('Apple', 'iPhone 16', 'iOS', true),
('Apple', 'iPhone 16 Plus', 'iOS', true),
('Apple', 'iPhone 16 Pro', 'iOS', true),
('Apple', 'iPhone 16 Pro Max', 'iOS', true),
('Apple', 'iPad Pro (2018)', 'iOS', true),
('Apple', 'iPad Pro (2020)', 'iOS', true),
('Apple', 'iPad Pro (2021)', 'iOS', true),
('Apple', 'iPad Air (2019)', 'iOS', true),
('Apple', 'iPad Air (2020)', 'iOS', true),
('Apple', 'iPad (2019)', 'iOS', true),
('Apple', 'iPad (2020)', 'iOS', true),
('Apple', 'iPad mini (2019)', 'iOS', true),
-- Android devices
('Samsung', 'Galaxy S20', 'Android', true),
('Samsung', 'Galaxy S20+', 'Android', true),
('Samsung', 'Galaxy S20 Ultra', 'Android', true),
('Samsung', 'Galaxy S21', 'Android', true),
('Samsung', 'Galaxy S21+', 'Android', true),
('Samsung', 'Galaxy S21 Ultra', 'Android', true),
('Samsung', 'Galaxy S22', 'Android', true),
('Samsung', 'Galaxy S22+', 'Android', true),
('Samsung', 'Galaxy S22 Ultra', 'Android', true),
('Samsung', 'Galaxy S23', 'Android', true),
('Samsung', 'Galaxy S23+', 'Android', true),
('Samsung', 'Galaxy S23 Ultra', 'Android', true),
('Samsung', 'Galaxy S24', 'Android', true),
('Samsung', 'Galaxy S24+', 'Android', true),
('Samsung', 'Galaxy S24 Ultra', 'Android', true),
('Samsung', 'Galaxy Note 20', 'Android', true),
('Samsung', 'Galaxy Note 20 Ultra', 'Android', true),
('Samsung', 'Galaxy Z Fold2', 'Android', true),
('Samsung', 'Galaxy Z Fold3', 'Android', true),
('Samsung', 'Galaxy Z Fold4', 'Android', true),
('Samsung', 'Galaxy Z Fold5', 'Android', true),
('Samsung', 'Galaxy Z Flip', 'Android', true),
('Samsung', 'Galaxy Z Flip3', 'Android', true),
('Samsung', 'Galaxy Z Flip4', 'Android', true),
('Samsung', 'Galaxy Z Flip5', 'Android', true),
('Google', 'Pixel 3', 'Android', true),
('Google', 'Pixel 3 XL', 'Android', true),
('Google', 'Pixel 3a', 'Android', true),
('Google', 'Pixel 3a XL', 'Android', true),
('Google', 'Pixel 4', 'Android', true),
('Google', 'Pixel 4 XL', 'Android', true),
('Google', 'Pixel 4a', 'Android', true),
('Google', 'Pixel 4a 5G', 'Android', true),
('Google', 'Pixel 5', 'Android', true),
('Google', 'Pixel 5a', 'Android', true),
('Google', 'Pixel 6', 'Android', true),
('Google', 'Pixel 6 Pro', 'Android', true),
('Google', 'Pixel 6a', 'Android', true),
('Google', 'Pixel 7', 'Android', true),
('Google', 'Pixel 7 Pro', 'Android', true),
('Google', 'Pixel 7a', 'Android', true),
('Google', 'Pixel 8', 'Android', true),
('Google', 'Pixel 8 Pro', 'Android', true),
('Google', 'Pixel 8a', 'Android', true),
('OnePlus', '7T', 'Android', true),
('OnePlus', '8', 'Android', true),
('OnePlus', '8 Pro', 'Android', true),
('OnePlus', '8T', 'Android', true),
('OnePlus', '9', 'Android', true),
('OnePlus', '9 Pro', 'Android', true),
('OnePlus', '9RT', 'Android', true),
('OnePlus', '10 Pro', 'Android', true),
('OnePlus', '10T', 'Android', true),
('OnePlus', '11', 'Android', true),
('OnePlus', '11R', 'Android', true),
('OnePlus', 'Nord', 'Android', true),
('OnePlus', 'Nord 2', 'Android', true),
('OnePlus', 'Nord CE', 'Android', true),
('Xiaomi', 'Mi 10', 'Android', true),
('Xiaomi', 'Mi 10 Pro', 'Android', true),
('Xiaomi', 'Mi 11', 'Android', true),
('Xiaomi', 'Mi 11 Pro', 'Android', true),
('Xiaomi', 'Mi 11 Ultra', 'Android', true),
('Xiaomi', 'Mi 12', 'Android', true),
('Xiaomi', 'Mi 12 Pro', 'Android', true),
('Xiaomi', 'Redmi Note 9T', 'Android', true),
('Xiaomi', 'Redmi Note 10 5G', 'Android', true),
('Xiaomi', 'Redmi Note 11 Pro+ 5G', 'Android', true),
('Oppo', 'Find X3 Pro', 'Android', true),
('Oppo', 'Find X5', 'Android', true),
('Oppo', 'Find X5 Pro', 'Android', true),
('Oppo', 'Reno 5A', 'Android', true),
('Oppo', 'Reno 6 Pro 5G', 'Android', true),
('Vivo', 'V21 5G', 'Android', true),
('Vivo', 'X60 Pro', 'Android', true),
('Vivo', 'X70 Pro', 'Android', true),
('Sony', 'Xperia 10 III Lite', 'Android', true),
('Sony', 'Xperia 10 IV', 'Android', true),
('Sony', 'Xperia 1 IV', 'Android', true),
('Sony', 'Xperia 5 IV', 'Android', true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();