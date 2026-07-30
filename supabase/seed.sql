-- Jwears Seed Data
-- Run after schema: supabase db reset

INSERT INTO products (name, slug, description, price, compare_at_price, condition, sizes, images, material, category, style, in_stock, featured, eco_score) VALUES
  (
    'Vintage Floral Maxi Dress',
    'vintage-floral-maxi-dress',
    'A stunning vintage floral maxi dress with an A-line silhouette. Features delicate floral embroidery on lightweight cotton. Perfect for garden parties and summer events.',
    4900, 8900, 'pre-loved', ARRAY['xs', 's', 'm']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
    '100% Cotton', 'dresses', 'vintage', true, true, 85
  ),
  (
    'Upcycled Denim Midi Skirt',
    'upcycled-denim-midi-skirt',
    'Handcrafted from repurposed vintage denim, this midi skirt features a high-waisted fit with gold button detailing. Each piece is unique.',
    5500, NULL, 'upcycled', ARRAY['s', 'm', 'l']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800', 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400'],
    'Recycled Denim', 'skirts', 'minimal', true, true, 95
  ),
  (
    'Recycled Cashmere Crewneck',
    'recycled-cashmere-crewneck',
    'Re-spun from post-consumer cashmere sweaters, this incredibly soft crewneck proves that recycled fibers can be just as luxurious as virgin materials.',
    7200, 12000, 'recycled', ARRAY['xs', 's', 'm', 'l']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400'],
    '100% Recycled Cashmere', 'tops', 'minimal', true, true, 90
  ),
  (
    'Pre-Loved Silk Slip Dress',
    'pre-loved-silk-slip-dress',
    'A luxurious silk slip dress in a timeless champagne hue. The bias cut drapes beautifully, making it perfect for evening occasions or layered casual looks.',
    6800, 14000, 'pre-loved', ARRAY['xs', 's', 'm', 'l']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400'],
    '100% Silk', 'dresses', 'minimal', true, true, 75
  ),
  (
    'Upcycled Patchwork Blazer',
    'upcycled-patchwork-blazer',
    'An artful patchwork blazer assembled from deadstock fabric remnants. Relaxed oversized fit with notched lapels. Each piece is one-of-a-kind.',
    8900, NULL, 'upcycled', ARRAY['s', 'm', 'l', 'xl']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400'],
    'Mixed Deadstock Fabrics', 'outerwear', 'vintage', true, true, 98
  ),
  (
    'Recycled Linen Shirt Dress',
    'recycled-linen-shirt-dress',
    'An effortless shirt dress made from mechanically recycled linen fibers. Features a relaxed fit, button front, and side pockets. Breathable and perfect for warm weather.',
    5200, 9500, 'recycled', ARRAY['xs', 's', 'm', 'l', 'xl']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800', 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400'],
    '100% Recycled Linen', 'dresses', 'minimal', true, true, 88
  ),
  (
    'Pre-Loved Leather Crossbody',
    'pre-loved-leather-crossbody',
    'A gently worn leather crossbody bag in rich cognac. Features an adjustable strap, interior zip pocket, and brass hardware that has developed a beautiful patina.',
    4500, 8500, 'pre-loved', ARRAY[]::product_size[],
    ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'],
    'Genuine Leather', 'accessories', 'vintage', true, false, 70
  ),
  (
    'Upcycled Knit Halter Top',
    'upcycled-knit-halter-top',
    'Crocheted from reclaimed yarns, this halter top features an intricate open-stitch pattern. Adjustable tie neck and gathered bust. Perfect for summer festival season.',
    3800, NULL, 'upcycled', ARRAY['xs', 's', 'm', 'l']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=800', 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=400'],
    'Reclaimed Yarn Blend', 'tops', 'boho', true, false, 92
  ),
  (
    'Recycled Tailored Trousers',
    'recycled-tailored-trousers',
    'Sharp, wide-leg trousers crafted from recycled polyester-wool blend. Features front pleats, side pockets, and a high-rise waistband. Office-to-evening versatility.',
    6200, 11000, 'recycled', ARRAY['xs', 's', 'm', 'l', 'xl']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800', 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400'],
    'Recycled Wool Blend', 'bottoms', 'minimal', true, false, 82
  ),
  (
    'Pre-Loved Boho Crochet Dress',
    'pre-loved-boho-crochet-dress',
    'A dreamy crochet dress with intricate lace panels and a flowing silhouette. Lightweight and lined, perfect for beach vacations and romantic evenings.',
    4200, 7800, 'pre-loved', ARRAY['s', 'm', 'l']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'],
    'Cotton Blend', 'dresses', 'boho', true, false, 78
  ),
  (
    'Upcycled Jumpsuit',
    'upcycled-jumpsuit',
    'A versatile jumpsuit crafted from reworked vintage fabrics. Features a cinched waist, wide legs, and a deep V-neck. Pockets included.',
    5800, NULL, 'upcycled', ARRAY['s', 'm', 'l', 'xl']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1593031003416-1edab12ae324?w=800', 'https://images.unsplash.com/photo-1593031003416-1edab12ae324?w=400'],
    'Reworked Cotton Blend', 'dresses', 'boho', true, false, 90
  ),
  (
    'Recycled Puffer Vest',
    'recycled-puffer-vest',
    'A lightweight quilted vest insulated with 100% recycled synthetic down. Packable, warm, and perfect for layering. Made from post-consumer plastic bottles.',
    4800, 8500, 'recycled', ARRAY['xs', 's', 'm', 'l', 'xl']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400'],
    '100% Recycled Polyester', 'outerwear', 'minimal', true, false, 85
  ),
  (
    'Pre-Loved Velvet Mini Dress',
    'pre-loved-velvet-mini-dress',
    'A rich burgundy velvet mini dress with puff sleeves and a square neckline. In excellent vintage condition with working side zipper.',
    3600, 6500, 'pre-loved', ARRAY['s', 'm']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
    'Velvet', 'dresses', 'vintage', true, false, 72
  ),
  (
    'Upcycled Denim Jacket',
    'upcycled-denim-jacket',
    'A reconstructed denim jacket made from two vintage pairs of jeans. Features contrast stitching, hidden pockets, and a custom frayed hem. Each piece is handmade.',
    7500, NULL, 'upcycled', ARRAY['s', 'm', 'l']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'],
    'Repurposed Denim', 'outerwear', 'vintage', true, false, 95
  ),
  (
    'Recycled Cotton T-Shirt',
    'recycled-cotton-t-shirt',
    'The perfect everyday tee, made from mechanically recycled cotton fibers. Pre-shrunk, garment-dyed, and built to last. Available in a range of earth tones.',
    2400, 4500, 'recycled', ARRAY['xs', 's', 'm', 'l', 'xl', 'xxl']::product_size[],
    ARRAY['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400'],
    '100% Recycled Cotton', 'tops', 'minimal', true, false, 88
  );
