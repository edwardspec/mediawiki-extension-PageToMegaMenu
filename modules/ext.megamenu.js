/* Shows megamenu popups when user clicks some navigation links. */

$( function () {
	$( '.mw-megamenu' ).each( ( idx, menu ) => {
		const $menu = $( menu ),
			$link = $( $menu.attr( 'data-selector' ) );
		if ( !$link.length ) {
			return;
		}

		if ( $menu.parents( '.mw-parser-output' ).length ) {
			// User-added elements with class="mw-megamenu" are ignored,
			// only the extension is allowed to add megamenus.
			return;
		}

		const $toc = $( '<div>' ).attr( 'class', 'mw-megamenu-toc' );
		$menu.find( 'h2' ).toArray().map( ( elem ) => elem.innerText ).forEach( ( headerText ) => {
			$toc.append( $( '<div>' )
				.attr( 'class', 'mw-megamenu-header' )
				.append( headerText )
			);
		} );

		// Split menu into sections (each prepended by <h2> header).
		let html = $menu.html();
		html = html.replace( /<h2>/g, '</div><div class="mw-megamenu-subsection"><h2>' );

		$menu.empty().append(
			$toc,
			$( '<div>' ).attr( 'class', 'mw-megamenu-contents' ).append( html )
		);

		// TODO: only show 1 subsection at a time,
		// switch to another section in "mouseenter" event of another section's header.

		$link.click( ( ev ) => {
			ev.preventDefault();
			toggleMenu( $menu );
		} );
	} );

	/**
	 * Show/hide $menu.
	 *
	 * @param {jQuery} $menu
	 */
	function toggleMenu( $menu ) {
		$menu.css( 'display', $menu.css( 'display' ) === 'none' ? 'flex' : 'none' );
	}
}() );
