/**
 * BLOCK: Table of Contents - Save Block
 */

import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
import TOC from './table-of-contents';

const { __ } = wp.i18n;

const {
	RichText
} = wp.blockEditor

export default function save( props ) {
	
	const { className } = props

	const {
		align,
		block_id,
		tColumns,
		heading,
		headerLinks,
		mappingHeaders,
		scrollToTop,
		smoothScroll,
		makeCollapsible,
		icon,
		initialCollapse,
		smoothScrollOffset,
		smoothScrollDelay,
	} = props.attributes

	let icon_html = ''

	if ( makeCollapsible && icon ) {
		icon_html = (
			<span className="uag-toc__collapsible-wrap">{renderSVG(icon)}</span>
		)	
	}

	return (

		<div className={ classnames(
			className,
			`uagb-toc__align-${align}`,
			`uagb-toc__columns-${tColumns}`,
			( initialCollapse ) ? `uagb-toc__collapse` : '',
			`uagb-block-${ block_id }`
		) }
		data-scroll={smoothScroll}
		data-offset={smoothScrollOffset}
		data-delay={smoothScrollDelay}
		>
			<div className="uagb-toc__wrap">
				<div className="uagb-toc__title-wrap">
					<RichText.Content
						value={ heading }
						tagName='div'
						className='uagb-toc__title'
					/>
					{icon_html}
				</div>
				<TOC
					mappingHeaders={mappingHeaders}
					headers={headerLinks && JSON.parse(headerLinks)}
				/>
			</div>
		</div>
	)
}
