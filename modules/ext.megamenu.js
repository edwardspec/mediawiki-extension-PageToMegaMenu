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
		$menu.toggle();

		// TODO: split menu into sections (each prepended by <h2> header)
		// and turn <h2> tags into subsections. Only show 1 subsection at a time,
		// switch to another section in "mouseenter" event of another section's header.
	}
}() );
