Extension:MegamenuWikipage

This extension allows to add a large popup to some navigation links.
Contents of this popup are stored on the wikipage.
They can contain any wikitext (links, images, etc.).

## Example configuration

```php
// When user clicks on the element ".ca-talk" (Talk tab in Vector skin),
// contents of the page "MediaWiki:Discussion menu" will be shown as popup.
$wgMegamenuWikipageList['MediaWiki:Discussion menu'] = '.ca-talk';
```
