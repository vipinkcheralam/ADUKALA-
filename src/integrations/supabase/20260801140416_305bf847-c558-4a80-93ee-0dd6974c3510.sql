CREATE TABLE public.app_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version_name text NOT NULL,
  version_code integer NOT NULL,
  apk_url text NOT NULL,
  release_notes text NOT NULL DEFAULT '',
  mandatory boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.app_versions TO anon;
GRANT SELECT ON public.app_versions TO authenticated;
GRANT ALL ON public.app_versions TO service_role;

ALTER TABLE public.app_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published app versions are publicly readable"
ON public.app_versions FOR SELECT
USING (published = true);

CREATE TRIGGER update_app_versions_updated_at
BEFORE UPDATE ON public.app_versions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX app_versions_code_idx ON public.app_versions (version_code DESC);

INSERT INTO public.app_versions (version_name, version_code, apk_url, release_notes, mandatory, published)
VALUES ('1.0.0', 1, 'https://example.com/adukkala-1.0.0.apk', 'Initial release.', false, true);