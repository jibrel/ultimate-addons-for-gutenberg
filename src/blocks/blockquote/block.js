/**
 * BLOCK: Quote
 */

// Import block dependencies and components.
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import icon.
import edit from "./edit"
import deprecated from "./deprecated"
import save from "./save"
import attributes from "./attributes"
import "./editor.scss"
import "./style.scss"
const { __ } = wp.i18n

// Import registerBlockType() from wp.blocks
const {
	registerBlockType,
} = wp.blocks

/**
 * Register: as Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior.
 *
 * @link https://.org/gutenberg/handbook/block-api/
 * @param  {string}   namwordpresse     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( "uagb/blockquote", {
	title: uagb_blocks_info.blocks["uagb/blockquote"]["title"],
	description: uagb_blocks_info.blocks["uagb/blockquote"]["description"],
	icon: UAGB_Block_Icons.blockquote,
	keywords: [
		__( "blockquote" ),
		__( "quote" ),
		__( "uagb" ),
	],
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	deprecated,
} )
