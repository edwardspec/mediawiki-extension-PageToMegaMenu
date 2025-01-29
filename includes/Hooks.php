<?php

/**
 * Implements PageToMegaMenu extension for MediaWiki.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * http://www.gnu.org/copyleft/gpl.html
 *
 * @file
 */

namespace MediaWiki\PageToMegaMenu;

use MediaWiki\Hook\BeforePageDisplayHook;
use MediaWiki\Page\WikiPageFactory;
use OutputPage;
use Skin;
use Title;
use Xml;

/**
 * Hooks of Extension:PageToMegaMenu.
 */
class Hooks implements BeforePageDisplayHook {
	/** @var WikiPageFactory */
	protected $wikiPageFactory;

	/**
	 * @param WikiPageFactory $wikiPageFactory
	 */
	public function __construct( WikiPageFactory $wikiPageFactory ) {
		$this->wikiPageFactory = $wikiPageFactory;
	}

	/**
	 * Add "megamenu" module to articles.
	 *
	 * @param OutputPage $out
	 * @param Skin $skin
	 * @return void
	 */
	public function onBeforePageDisplay( $out, $skin ): void {
		global $wgPageToMegaMenuList;

		foreach ( $wgPageToMegaMenuList as $pageName => $cssSelector ) {
			// TODO: save parsed HTML of all pages in $wgPageToMegaMenuList
			// as hidden <div> tags, so that they can be used by JavaScript.
			$title = Title::newFromText( $pageName );
			if ( !$title ) {
				continue;
			}

			$page = $this->wikiPageFactory->newFromTitle( $title );
			if ( !$page ) {
				continue;
			}

			$pout = $page->getParserOutput();
			if ( !$pout ) {
				continue;
			}

			$html = $pout->getText( [
				'allowTOC' => false,
				'enableSectionEditLinks' => false
			] );

			$out->addHTML( Xml::tags( 'div', [
				'class' => 'mw-megamenu',
				'data-selector' => $cssSelector
			], $html ) );
		}

		$out->addModules( 'ext.megamenu' );
		$out->addModuleStyles( 'ext.megamenu.css' );
	}
}
