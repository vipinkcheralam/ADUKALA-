CREATE POLICY "Community media readable" ON storage.objects FOR SELECT USING (bucket_id = 'community-media');
CREATE POLICY "Community media uploadable" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'community-media');
CREATE POLICY "Community media removable" ON storage.objects FOR DELETE USING (bucket_id = 'community-media');