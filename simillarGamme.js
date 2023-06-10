{ /// 

const { $, $$, $c, $t } = _( document ) 

const output = $ `#output` 
const canvText = ` 
	0 31 
	0 63 
	31 63 
	0 95 
	31 95 
	0 127 
	63 95 
	31 127 
	0 159 
	63 127 
	31 159 
	0 191 
	95 127 
	63 159 
	31 191 
	0 223 
	95 159 
	63 191 
	31 223 
	0 255 
	127 159 
	95 191 
	63 223 
	31 255 
	127 191 
	95 223 
	63 255 
	159 191 
	127 223 
	95 255 
	159 223 
	127 255 
	191 223 
	159 255 
	191 255 
	` // -- canvText 
const canv = canvText .match( /\d+/g ) .map( t => + t ) 

fillRGB( canv, output, [ 1, 0, 0 ] ) 
output .appendChild( $c `br` ) 
fillRGB( canv, output, [ 0, 1, 0 ] ) 
output .appendChild( $c `br` ) 
fillRGB( canv, output, [ 0, 0, 1 ] ) 
output .appendChild( $c `br` ) 
fillRGB( canv, output, [ 1, 1, 1 ] ) 

// .. functions .. 

function fillRGB( canv, output, [ r, g, b ] ) { 
	for ( let i = 0; i < canv .length; i += 2 ) { 
		const cane = $c `canvas` 
		
		output .appendChild( cane ) 
		canfil( canv[ i ], canv[ i + 1 ], cane, [ r, g, b ] ) 
		
		output .appendChild( $t `${ ( canv[ i ] + canv[ i + 1 ] ) / 2 } ` ) 
		} // -- for < length 
	} // -- fillRGB() 

function canfil( ac, bc, can, [ r, g, b ] ) { 
	const tx = can .getContext `2d` 
	const aav = ac * ac 
	const bbv = bc * bc 
	const cv0 = Math .floor( Math .sqrt( ( aav + bbv ) / 2 ) ) 
	const cv1 = cv0 + 1 
	let dvv 
	const cvv = cv1 * cv1 
		
	const w = 100 
	const h = 100 
	const hw = w / 2 
	
	can .width = w 
	can .height = h 
	const ia = tx .getImageData( 0, 0, w, h ) 
	const iad = ia .data // 100x100x4(rgba) 
	
	let p = 0 
	let psum = 0 
	for ( let y = 0; y < h; y += 1 ) { 
		for ( let x = 0; x < w; x += 1 ) { 
			if ( x < hw ) { 
				} // if < hw 
			else { 
				psum += cv0 * cv0 
				dvv = psum >= cvv ? cv1 : cv0 
				psum -= dvv * dvv 
				} // < hw else 
			for ( let n = 0; n < 3; n += 1 ) { 
				if 
						(  ( r && ( n == 0 ) ) 
						|| ( g && ( n == 1 ) ) 
						|| ( b && ( n == 2 ) ) 
						) { // rgb each 
					if ( x < hw ) { 
						iad[ p ] = ( y % 2 ) ? ac : bc 
						} // if x < hw 
					else { 
						iad[ p ] = dvv 
						} // x < hw else 
					} // -- if rgb n 012 
				else { // no rgb 
					iad[ p ] = 0 
					} // -- rgb n 012 else 
				p += 1 
				} // -- for n 
			iad[ p ] = 255 // 0..100 
			p += 1 
			} // -- for x 
		} // -- for y 
	tx .putImageData( ia, 0, 0 ) 
	} // -- canfil() 

function _( ele ) { 
	const $ = q => ele .querySelector( q ) 
	const $$ = q => ele .querySelectorAll( q ) 
	const $c = q => ele .createElement( q ) 
	const $t = ( ... ar ) => ele .createTextNode( rawValue( ... ar ) ) 
	
	return { $, $$, $c, $t } 
	} // -- _() 

function rawValue( ... ar ) { 
	const [ rawo ] = ar 
	return rawo ?.raw ? String .raw( ... ar ) : rawo 
	} // -- rawValue() 

} /// 
