DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/build

java -jar ../compiler/compiler.jar --js \
../js/utils.js \
../js/common.js \
../js/Item.js \
../js/SvgItem.js \
../js/math.js \
../js/Matrix.js \
../js/Piece.js \
../js/pieces.js \
../js/Pile.js \
../js/Rect.js \
../js/SvgTetris.js \
../js/Text.js \
../js/Vector.js \
../js/Animation.js \
--js_output_file svgtetris-min.js --compilation_level SIMPLE --create_source_map svgtetris-min.js.map
