CREATE TABLE public.dishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  image_key text NOT NULL,
  time_label text NOT NULL DEFAULT '30 min',
  rating numeric(2,1) NOT NULL DEFAULT 4.5,
  veg boolean NOT NULL DEFAULT true,
  tag_kind text NOT NULL DEFAULT 'veg',
  name_ml text NOT NULL, name_en text NOT NULL, name_hi text NOT NULL,
  sub_ml text NOT NULL, sub_en text NOT NULL, sub_hi text NOT NULL,
  tag_ml text NOT NULL, tag_en text NOT NULL, tag_hi text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.dishes TO anon;
GRANT SELECT ON public.dishes TO authenticated;
GRANT ALL ON public.dishes TO service_role;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Dishes are publicly readable" ON public.dishes FOR SELECT USING (active = true);

CREATE TABLE public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL,
  dish_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (device_id, dish_slug)
);
CREATE INDEX favorites_device_idx ON public.favorites (device_id);

GRANT SELECT, INSERT, DELETE ON public.favorites TO anon;
GRANT SELECT, INSERT, DELETE ON public.favorites TO authenticated;
GRANT ALL ON public.favorites TO service_role;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Favorites readable by device" ON public.favorites FOR SELECT USING (true);
CREATE POLICY "Favorites insertable" ON public.favorites FOR INSERT WITH CHECK (length(device_id) BETWEEN 8 AND 64);
CREATE POLICY "Favorites deletable" ON public.favorites FOR DELETE USING (length(device_id) BETWEEN 8 AND 64);

INSERT INTO public.dishes (slug, image_key, time_label, rating, veg, tag_kind, name_ml, name_en, name_hi, sub_ml, sub_en, sub_hi, tag_ml, tag_en, tag_hi, sort_order) VALUES
('meen-curry','meen-curry','35 min',4.8,false,'spice','മീൻ കറി','Meen Curry','मीन करी','നാടൻ മീൻ കറി','Kerala Fish Curry','केरल मछली करी','എരിവുള്ളത്','Spicy','तीखा',1),
('appam-stew','appam','20 min',4.7,true,'premium','ആപ്പം & സ്റ്റ്യൂ','Appam & Stew','अप्पम व स्ट्यू','ആപ്പവും വെജ് സ്റ്റ്യൂവും','Lace hoppers with stew','अप्पम और नारियल स्ट्यू','പ്രീമിയം','Premium','प्रीमियम',2),
('cabbage-thoran','thoran','15 min',4.6,true,'veg','കാബേജ് തോരൻ','Cabbage Thoran','गोभी थोरन','തേങ്ങ ചേർത്ത തോരൻ','Coconut stir-fry','नारियल भुजिया','വെജ്','Veg','शाकाहारी',3),
('puttu-kadala','puttu','25 min',4.9,true,'premium','പുട്ട് & കടല','Puttu & Kadala','पुट्टु व कडला','പുട്ടും കടലക്കറിയും','Steamed rice cake','स्टीम्ड राइस केक','ട്രെൻഡിംഗ്','Trending','ट्रेंडिंग',4),
('chicken-biryani','biryani','60 min',4.9,false,'spice','മലബാർ ബിരിയാണി','Malabar Biryani','मलाबार बिरयानी','ചിക്കൻ ബിരിയാണി','Fragrant chicken biryani','खुशबूदार चिकन बिरयानी','എരിവുള്ളത്','Spicy','तीखा',5),
('masala-dosa','dosa','30 min',4.7,true,'veg','മസാല ദോശ','Masala Dosa','मसाला दोसा','ഉരുളക്കിഴങ്ങ് മസാല ദോശ','Crisp dosa with potato','आलू भरवां कुरकुरा दोसा','വെജ്','Veg','शाकाहारी',6),
('sambar','sambar','40 min',4.5,true,'veg','സാമ്പാർ','Sambar','सांबर','പച്ചക്കറി സാമ്പാർ','Vegetable lentil stew','सब्ज़ी दाल स्ट्यू','വെജ്','Veg','शाकाहारी',7),
('payasam','payasam','45 min',4.8,true,'premium','പാലട പായസം','Palada Payasam','पालदा पायसम','നാടൻ പാലട പായസം','Creamy rice ada dessert','मलाईदार चावल की खीर','പ്രീമിയം','Premium','प्रीमियम',8);

CREATE TABLE public.community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL,
  author_name text NOT NULL DEFAULT 'Home Chef',
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  steps text[] NOT NULL DEFAULT '{}',
  media_url text,
  media_type text NOT NULL DEFAULT 'image',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_posts TO anon, authenticated;
GRANT ALL ON public.community_posts TO service_role;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are publicly readable" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Posts insertable by device" ON public.community_posts FOR INSERT WITH CHECK (length(device_id) >= 8 AND length(device_id) <= 64 AND length(title) <= 120 AND length(description) <= 2000);
CREATE POLICY "Posts deletable by device" ON public.community_posts FOR DELETE USING (length(device_id) >= 8 AND length(device_id) <= 64);

CREATE TABLE public.community_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  device_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, device_id)
);
GRANT SELECT, INSERT, DELETE ON public.community_likes TO anon, authenticated;
GRANT ALL ON public.community_likes TO service_role;
ALTER TABLE public.community_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes are publicly readable" ON public.community_likes FOR SELECT USING (true);
CREATE POLICY "Likes insertable by device" ON public.community_likes FOR INSERT WITH CHECK (length(device_id) >= 8 AND length(device_id) <= 64);
CREATE POLICY "Likes deletable by device" ON public.community_likes FOR DELETE USING (length(device_id) >= 8 AND length(device_id) <= 64);

CREATE TABLE public.community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  device_id text NOT NULL,
  author_name text NOT NULL DEFAULT 'Home Chef',
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.community_comments TO anon, authenticated;
GRANT ALL ON public.community_comments TO service_role;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments are publicly readable" ON public.community_comments FOR SELECT USING (true);
CREATE POLICY "Comments insertable by device" ON public.community_comments FOR INSERT WITH CHECK (length(device_id) >= 8 AND length(device_id) <= 64 AND length(body) BETWEEN 1 AND 1000);
CREATE POLICY "Comments deletable by device" ON public.community_comments FOR DELETE USING (length(device_id) >= 8 AND length(device_id) <= 64);

CREATE INDEX community_posts_created_idx ON public.community_posts (created_at DESC);
CREATE INDEX community_likes_post_idx ON public.community_likes (post_id);
CREATE INDEX community_comments_post_idx ON public.community_comments (post_id, created_at);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.community_posts (device_id, author_name, title, description, steps, media_url, media_type) VALUES
('seed-device-0001', 'Ammu Nair', 'Amma''s Nadan Fish Curry', 'A slow-cooked kudampuli fish curry the way my grandmother made it in Alappuzha.', ARRAY['Soak kudampuli in warm water for 10 minutes.','Grind shallots, chilli and ginger into a coarse paste.','Simmer in a clay pot with coconut oil for 20 minutes.','Rest overnight for the best flavour.'], 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=70', 'image'),
('seed-device-0002', 'Rahul Menon', 'Crispy Kerala Banana Fritters', 'Golden pazham pori with a secret pinch of cardamom in the batter.', ARRAY['Slice ripe nendran bananas lengthwise.','Whisk maida, turmeric, sugar and cardamom into a thick batter.','Deep fry until deep golden.','Serve hot with evening chai.'], 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=70', 'image'),
('seed-device-0003', 'Fathima K', 'Homemade Thalassery Biryani', 'Dum-cooked kaima rice biryani from my family kitchen in Thalassery.', ARRAY['Fry onions, cashews and raisins in ghee.','Cook chicken masala with mint and coriander.','Layer with half-cooked kaima rice.','Seal and dum for 25 minutes on low flame.'], 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=70', 'image');

CREATE TABLE public.profiles (
  device_id text PRIMARY KEY,
  display_name text NOT NULL DEFAULT 'Home Chef',
  avatar_url text,
  bio text NOT NULL DEFAULT '',
  preferred_lang text NOT NULL DEFAULT 'en',
  name_changed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO anon, authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are publicly readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profiles insertable by device" ON public.profiles FOR INSERT
  WITH CHECK (length(device_id) >= 8 AND length(device_id) <= 64 AND length(display_name) <= 60 AND length(bio) <= 300);
CREATE POLICY "Profiles updatable by device" ON public.profiles FOR UPDATE
  USING (length(device_id) >= 8 AND length(device_id) <= 64)
  WITH CHECK (length(display_name) <= 60 AND length(bio) <= 300);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE UNIQUE INDEX profiles_display_name_unique
  ON public.profiles (lower(btrim(display_name)));

CREATE TABLE public.follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_device_id text NOT NULL,
  following_device_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (follower_device_id, following_device_id)
);
GRANT SELECT, INSERT, DELETE ON public.follows TO anon, authenticated;
GRANT ALL ON public.follows TO service_role;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Follows are publicly readable" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Follows insertable by device" ON public.follows FOR INSERT
  WITH CHECK (length(follower_device_id) >= 8 AND length(follower_device_id) <= 64
    AND length(following_device_id) >= 8 AND length(following_device_id) <= 64
    AND follower_device_id <> following_device_id);
CREATE POLICY "Follows deletable by device" ON public.follows FOR DELETE
  USING (length(follower_device_id) >= 8 AND length(follower_device_id) <= 64);

CREATE TABLE public.blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_device_id text NOT NULL,
  blocked_device_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (blocker_device_id, blocked_device_id)
);
GRANT SELECT, INSERT, DELETE ON public.blocks TO anon, authenticated;
GRANT ALL ON public.blocks TO service_role;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blocks readable" ON public.blocks FOR SELECT USING (true);
CREATE POLICY "Blocks insertable by device" ON public.blocks FOR INSERT
  WITH CHECK (length(blocker_device_id) >= 8 AND length(blocker_device_id) <= 64
    AND length(blocked_device_id) >= 8 AND length(blocked_device_id) <= 64
    AND blocker_device_id <> blocked_device_id);
CREATE POLICY "Blocks deletable by device" ON public.blocks FOR DELETE
  USING (length(blocker_device_id) >= 8 AND length(blocker_device_id) <= 64);

CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_device_id text NOT NULL,
  recipient_device_id text NOT NULL,
  body text NOT NULL DEFAULT '',
  media_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX messages_pair_idx ON public.messages (sender_device_id, recipient_device_id, created_at);
GRANT INSERT ON public.messages TO anon, authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Messages insertable by device" ON public.messages FOR INSERT
  WITH CHECK (length(sender_device_id) >= 8 AND length(sender_device_id) <= 64
    AND length(recipient_device_id) >= 8 AND length(recipient_device_id) <= 64
    AND length(body) <= 2000
    AND NOT EXISTS (
      SELECT 1 FROM public.blocks b
      WHERE b.blocker_device_id = recipient_device_id AND b.blocked_device_id = sender_device_id
    ));

CREATE OR REPLACE FUNCTION public.get_conversation(_me text, _other text)
RETURNS TABLE (id uuid, sender_device_id text, recipient_device_id text, body text, media_url text, created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT m.id, m.sender_device_id, m.recipient_device_id, m.body, m.media_url, m.created_at
  FROM public.messages m
  WHERE length(_me) >= 8 AND length(_other) >= 8
    AND ((m.sender_device_id = _me AND m.recipient_device_id = _other)
      OR (m.sender_device_id = _other AND m.recipient_device_id = _me))
  ORDER BY m.created_at ASC
  LIMIT 200
$$;
GRANT EXECUTE ON FUNCTION public.get_conversation(text, text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.get_inbox(_me text)
RETURNS TABLE (other_device_id text, last_body text, last_created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT ON (other) other AS other_device_id, m.body AS last_body, m.created_at AS last_created_at
  FROM (
    SELECT *, CASE WHEN sender_device_id = _me THEN recipient_device_id ELSE sender_device_id END AS other
    FROM public.messages
    WHERE length(_me) >= 8 AND (sender_device_id = _me OR recipient_device_id = _me)
  ) m
  ORDER BY other, m.created_at DESC
$$;
GRANT EXECUTE ON FUNCTION public.get_inbox(text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.rename_profile(_device_id text, _new_name text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name text := btrim(coalesce(_new_name, ''));
  v_cooldown interval := interval '120 days';
  v_last timestamptz;
  v_current text;
BEGIN
  IF length(_device_id) < 8 OR length(_device_id) > 64 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid_device');
  END IF;
  IF length(v_name) < 3 OR length(v_name) > 30 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid_name');
  END IF;

  SELECT display_name, name_changed_at INTO v_current, v_last
  FROM public.profiles WHERE device_id = _device_id;

  IF v_current IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'no_profile');
  END IF;

  IF lower(btrim(v_current)) = lower(v_name) THEN
    RETURN jsonb_build_object('ok', true, 'name', v_current, 'unchanged', true);
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.profiles
    WHERE lower(btrim(display_name)) = lower(v_name) AND device_id <> _device_id
  ) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'taken');
  END IF;

  IF v_last IS NOT NULL AND now() < v_last + v_cooldown THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'cooldown', 'next_allowed_at', v_last + v_cooldown);
  END IF;

  UPDATE public.profiles
  SET display_name = v_name, name_changed_at = now(), updated_at = now()
  WHERE device_id = _device_id;

  RETURN jsonb_build_object('ok', true, 'name', v_name, 'next_allowed_at', now() + v_cooldown);
EXCEPTION WHEN unique_violation THEN
  RETURN jsonb_build_object('ok', false, 'reason', 'taken');
END;
$$;

GRANT EXECUTE ON FUNCTION public.rename_profile(text, text) TO anon, authenticated, service_role;