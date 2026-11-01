# Nailzify theme design

Source: approved holiday header images and the current storefront

## Character

Nailzify uses warm ivory surfaces, soft pink details, cranberry accents, narrow modern text, and generous space. Product photography carries the visual weight. Decorative details stay thin and quiet.

## Build mandate

Keep storefront content inside a centered content area on desktop. Use calm proportions and modest text sizes. Use rounded photography with clear product focus. Mobile layouts must preserve the same hierarchy and keep calls to action visible without crowding the product images.

The shared storefront tokens and component styling live in `assets/nailzify-site.css`. The homepage and product page styles extend that foundation in `assets/nailzify-home.css` and `assets/nailzify-product.css`. Feature specific tokens live beside their section styles.

## Storefront system

All standard storefront pages use the product page palette: warm ivory `#fbf7f2` for the canvas, off white `#fffdfa` for cards and fields, charcoal brown `#342a28` for primary text, muted brown `#695a56` for supporting copy, cranberry `#a64862` for actions, deep cranberry `#802d44` for emphasis, soft pink `#f7e5ea` for quiet highlights, and warm gray `#dccfc9` for lines.

Desktop content stays centered inside a 1240 pixel maximum width. Full bleed imagery and color bands may extend edge to edge, but their text and controls return to the shared content width.

Barlow Semi Condensed is the storefront type family. Display titles use the 200 weight with a tight but readable line height. Product names, navigation, section labels, and primary actions use the 600 weight. Standard page titles stay below 60 pixels on desktop and 38 pixels on mobile.

Buttons use cranberry with white text and a modest corner radius. Inputs use off white surfaces, warm gray outlines, and a cranberry focus state. Product cards, article media, FAQs, contact panels, and other functional surfaces use quiet radii, fine warm gray lines, and no heavy shadows.

The header uses an off white surface with centered content. The announcement bar uses cranberry. The footer uses charcoal brown with off white text. Drawers, cookie controls, the mobile dock, account pages, policy pages, and checkout inherit the same palette.

## Holiday header

The desktop holiday banner places ivory copy on the left and transparent hand photography on the right inside a 1260 pixel content area. The 460 pixel band uses the same full width warm studio background as mobile. Both sizes rotate between snowflake and Polka Dot every two seconds. Desktop hand scale and vertical position are editable independently of mobile. The older desktop card gallery is available by disabling the matching desktop hand banner setting. The script heading is raster artwork because its supplied license permits web artwork but does not permit embedding the font file.

The holiday studio background runs edge to edge on desktop and mobile. Its desktop copy and product imagery stay centered inside a 1260 pixel maximum content area.

The desktop Polka Dot card uses a reversed macro hand composition to balance the Cranberry card on the opposite side.

The hand slider uses separate desktop picture sources with completed sweater sides. Mobile retains its approved portrait cutouts. Desktop artwork can be replaced through the transparent desktop hand image picker without changing the mobile photo.

The supporting holiday line uses Cyrene as raster artwork. Its commercial license does not permit redistribution, so the font file is not published with the theme.

Holiday copy reveals in a calm sequence when the page loads. The script heading fades in first with a soft blur and slight lift, followed by the finishing line and then the button. Reduced motion preferences remove the animation. Mobile gives the script artwork the visual equivalent of a four pixel type increase.

The mobile holiday poster uses a fixed background and fixed copy layer. Transparent hand artwork changes independently with a soft sideways slide and fade inside a 620 pixel poster. The pink snowflake photograph opens, followed by Polka Dot, with a two second slide interval. Chrome Princess is excluded from the mobile rotation. Each block has a separate mobile slide order so desktop cards retain their composition. Mobile descriptions, labels, and links can override the desktop card settings. The product label changes with the visible hands, while the headline, supporting line, and main button remain still. Touch swiping and quiet line indicators provide manual control. Motion stops after manual interaction and is removed when reduced motion is preferred.

## It Girl Duo

The promotion uses a full width color band with no visible borders. Its offer copy and product cards remain aligned to the shared centered homepage content width.

The standard Buy one. Get one free. heading uses Creattion for Buy and Get, Cyrene for both one words, and bold Barlow Semi Condensed in dark maroon for FREE. The licensed display fonts are rendered as transparent word artwork with accessible heading text. Custom offer headings retain the standard live font.

## Homepage section rhythm

Homepage sections alternate between the product page warm ivory canvas and the It Girl Duo beige. The holiday header starts with the product canvas, the It Girl Duo keeps its beige, and every visible section after it continues the alternating pattern.

Best Sellers explicitly uses the It Girl Duo beige. Summer Vibes and Nail Accessories keep their existing backgrounds.

## Homepage collection cards

Homepage featured collections use the approved Soft editorial direction through `snippets/nailzify-editorial-card.liquid`. Cards have an open background, square photos with soft corners, modest product names, compact prices, plain shape and finish text, real review stars when ratings exist, and an understated action with a fine bottom rule. Mobile shows one complete card and half of the next card within the content gutters to signal horizontal swiping. A soft fade smooths the clipped edge, follows scrolling, and clears at the end so the final card remains readable. Tablet shows two complete cards. Products with options, selling plans, or quantity rules open their product page; ordinary single variant products use the existing cart form. Collection pages retain their shared catalog cards.

## Homepage benefits

The Clean inline benefit strip sits directly below the holiday banner, before It Girl Duo. It replaces the old pink logo marquee. It uses charcoal text and line icons on product page ivory, five static items inside the shared content width, and quiet dividers. The order is Designed in USA, 5 minute application, Salon quality, Woman owned, and 24/7 support with Real people. Mobile uses two columns, with support centered across the last row. The Nailzify benefits section exposes editable text, icons, colors, icon size, and desktop spacing.
