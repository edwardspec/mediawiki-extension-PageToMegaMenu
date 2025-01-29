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

		const $headers = $( '.mw-megamenu-header' ),
			$sections = $( '.mw-megamenu-subsection' );

		$headers.each( ( headerIdx, header ) => {
			$( header ).data( 'headerIdx', headerIdx );
		} );

		// Maximum height that the menu has ever assumed after showing a subsection.
		let maxHeight = 0;

		// Display one of the subsections of the menu.
		// Hides the previously shown subsection.
		function showSection( $header ) {
			$sections.hide();
			$( $sections[ $header.data( 'headerIdx' ) ] ).show();

			// Don't reduce the size of menu when switching to a shorter section.
			$menu.height( 'auto' );
			maxHeight = Math.max( maxHeight, $menu.height() );
			$menu.height( maxHeight );

			$headers.removeClass( 'mw-megamenu-activetab' );
			$header.addClass( 'mw-megamenu-activetab' );
		}

		$sections.hide();
		$sections.first().show();
		$headers.first().addClass( 'mw-megamenu-activetab' );

		$headers.on( 'mouseenter', () => {
			showSection( $( event.target ) );
		} );

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
