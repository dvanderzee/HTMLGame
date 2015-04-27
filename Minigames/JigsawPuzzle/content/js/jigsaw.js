/*
 *	File: jigsaw.js
 *	Creator: Zach Dugas
 *	Modified from code by Marcelo Ricardo de Oliveira found here: http://www.codeproject.com/Articles/395453/Html-Jigsaw-Puzzle
 *
 *	An online jigsaw puzzle  using the features of the Paper JS framework.  The main function of this file is createJigsaw which
 *	is given the id of a div element and the path to the puzzle image as parameters.  The function then dynamically fills the div 
 *	with an HTML canvas element and buttons used for the jigsaw puzzle.  A JigsawPuzzle object is then instantiated and associated 
 *	with the canvas.  This object handles all of the actions that the user can perform on the puzzle (selecting pieces, dragging, etc.)
 *	and tracks error in piece placement and when the puzzle is actually completed.
 *
 */
 
 // This is the constructor for a JigsawPuzzle object
 var JigsawPuzzle = function() {
 // PURPOSE: Construct a JigsawPuzzle object
 // INPUT: divID - The id of the dom element to create the puzzle in
 //		   imgPath - The path to the image to construct the puzzle from
 // OUTPUT: Instantiates a JigsawPuzzle object

	// Configure the initial settings
	this.currentZoom = 1;
	this.zoomScaleOnDrag = 1.125;
	this.imgName = 'puzzle-image';
	this.puzzleImage = new Raster(this.imgName);
	this.puzzleImage.position = view.center;
	this.imgWidth = $('.puzzle-image').css('width').replace('px', '');
	this.imgHeight = $('.puzzle-image').css('height').replace('px', '');
	this.puzzleImage.visible = false;
	this.tileWidth = 64;
	this.tilesPerRow = Math.ceil(this.imgWidth / this.tileWidth);
	this.tilesPerColumn = Math.ceil(this.imgHeight / this.tileWidth);
	this.selectedTile = undefined;
	this.selectedTileIndex = undefined;
	this.selectionGroup = undefined;
	this.shadowWidth = 120;
	this.shadowScale = 1.5;
	
	// Create the puzzle pieces
	this.tiles = createTiles(this.tileWidth, this.tilesPerRow, this.tilesPerColumn, this.puzzleImage);
 };
 
 
 
 
 function createTiles(tileWidth, tilesPerRow, tilesPerColumn, puzzleImage) {
 // PURPOSE: Create the tiles for the jigsaw puzzle using random shapes
 // INPUT: None
 // OUTPUT: The array of puzzle piece tiles
	 
	// Array of puzzle pieces
	var tiles = new Array();
	// Calculate the tile ratio
	var tileRatio = tileWidth / 100.0;

	// Get random shapes for the puzzle pieces
	var shapeArray = getRandomShapes(tilesPerRow, tilesPerColumn);
	
	// Array to track the indexes of the tiles while mixed up
	var tileIndexes = new Array();
	
	// Loop through the puzzle pieces
	for (var y = 0; y < tilesPerColumn; y++) {
		for (var x = 0; x < tilesPerRow; x++) {

			// Select the determined shape of the current piece from the shape array
			var shape = shapeArray[y * tilesPerRow + x];

			// Calculate a mask for the shape of the piece
			var mask = getMask(tileRatio, shape.topTab, shape.rightTab, shape.bottomTab, shape.leftTab, tileWidth);
			mask.opacity = 0.25;
			mask.strokeColor = '#fff';

			var cloneImg = puzzleImage.clone();
			// Create a raster object for the puzzle piece
			var img = getTileRaster(cloneImg, tileWidth, new Point(tileWidth * x, tileWidth * y));
			
			// Create a border for the puzzle piece
			var border = mask.clone();
			border.strokeColor = '#ccc';
			border.strokeWidth = 5;

			// Create the puzzle piece by grouping the mask, border, and tile image together
			var tile = new Group(mask, border, img, border);
			tile.clipped = true;
			tile.opacity = 1;
			tile.shape = shape;
			tile.imagePosition = new Point(x, y);

			// Add the piece to the array of puzzle pieces
			tiles.push(tile);
			// Add the piece's index to the index array
			tileIndexes.push(tileIndexes.length);
		}
	}

	// Loop through the puzzle pieces and randomize their order
	for (var y = 0; y < tilesPerColumn; y++) {
		for (var x = 0; x < tilesPerRow; x++) {

			// Get random value between 0 and the number of remaining pieces
			var index1 = Math.floor(Math.random() * tileIndexes.length);
			// Find the randomly selected piece's index
			var index2 = tileIndexes[index1];
			// Get the puzzle piece
			var tile = tiles[index2];
			// Remove that piece's index from the remaining indexes
			tileIndexes.splice(index1, 1);

			// Calculate the position where the selected piece will be placed on the canvas
			var position = view.center - 
							new Point(tileWidth, tileWidth / 2) + 
							new Point(tileWidth * (x * 2 + ((y % 2))), tileWidth  * y) -
							new Point(puzzleImage.size.width, puzzleImage.size.height / 2);

			// Convert the position to a cell position in the matrix layout
			var cellPosition = new Point(
				Math.round(position.x / tileWidth) + 1,
				Math.round(position.y / tileWidth) + 1);

			// Set the puzzle pieces position and cell position values
			tile.position = cellPosition * tileWidth;
			tile.cellPosition = cellPosition;                        
		}
	}
	// Return the array of puzzle piece tiles
	return tiles;
 }
 


 function getRandomShapes(width, height) {
 // PURPOSE: Create the random puzzle shapes.  The shape is determined by the values of the four tabs, one for each side of
 //			the puzzle piece.  A tab value of 0 represents a flat side (border), a tab value of +1 indicates a male puzzle 
 //			connector, and a tab value of -1 indicates a female puzzle connector.  Note, this function assigns random tab values
 //			to the right and bottom sides of each puzzle piece, and then carries the shape over so the the left and top sides
 //			of each piece correspond to the matching connector for the surrounding pieces.
 //			For example) If a piece is assigned a right side tab value of +1, then the piece to the right is assigned a left side
 //			tab value of -1 so that the pieces match up.
 // INPUT: The height and width of the puzzle in number of pieces
 // OUTPUT: An array of puzzle piece shapes
	
	var shapeArray = new Array();

	// Loop through all of the puzzle pieces
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {

			// Initialize the tab values as undefined
			var topTab = undefined;
			var rightTab = undefined;
			var bottomTab = undefined;
			var leftTab = undefined;

			// If the piece is a boarder piece set its border edge tab to 0
			if (y == 0)
				topTab = 0;

			if (y == height - 1)
				bottomTab = 0;

			if (x == 0)
				leftTab = 0;

			if (x == width - 1)
				rightTab = 0;

			// Add the puzzle shape to the shape array
			shapeArray.push(
				({
					topTab: topTab,
					rightTab: rightTab,
					bottomTab: bottomTab,
					leftTab: leftTab
				})
			);
		}
	}

	// Loop through the puzzle pieces
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			// Find the puzzle piece's shape object in the shape array
			var shape = shapeArray[y * width + x];
			
			// Get the shape of the piece to the right of this piece
			var shapeRight = (x < width - 1) ? 
				shapeArray[y * width + (x + 1)] : 
				undefined;
			
			// Get the shape of the piece bellow this piece
			var shapeBottom = (y < height - 1) ? 
				shapeArray[(y + 1) * width + x] :
				undefined;

			// Determine the shape of the right side of this piece
			shape.rightTab = (x < width - 1) ? 
				Math.pow(-1, Math.floor(Math.random() * 2)) :
				shape.rightTab;

			// If there is a shape to the right of this piece, set the left side of it equal to the opposite shape of the right side of this piece
			if (shapeRight)
				shapeRight.leftTab = - shape.rightTab;
			
			// Determine the shape of the bottom side of this piece
			shape.bottomTab = (y < height - 1) ? 
				Math.pow(-1, Math.floor(Math.random() * 2)) :
				shape.bottomTab;

			// If there is a shape bellow this piece, set the top side of it equal to the opposite shape of the bottom side of this piece
			if (shapeBottom)
				shapeBottom.topTab = - shape.bottomTab;
		}
	}
	// Return the array of puzzle piece shapes
	return shapeArray;
}


 function getMask(tileRatio, topTab, rightTab, bottomTab, leftTab, tileWidth) {
 // PURPOSE: Create a mask for the shape of a puzzle piece.  This function defines the actual shape of a puzzle
 //		piece using the tab parameters that are passed.  This mask is used to "cut out" the piece's shape from
 //		the overall puzzle image
 //	INPUT: TileRatio - Ratio of tile width / 100
 //		   topTab - The tab value associated with the top side of the piece
 //		   rightTab - The tab value associated with the right side of the piece
 //		   bottomTab - The tab value associated with the bottom side of the piece
 //		   leftTab - The tab value associated with the left side of the piece
 //		   tileWidth - The width of the puzzle piece
 //	OUTPUT: Returns the mask defining the piece's shape
 
	var bezierCurves = [
		  0, 0, 35, 15, 37, 5,
		  37, 5, 40, 0, 38, -5,
		  38, -5, 20, -20, 50, -20,
		  50, -20, 80, -20, 62, -5,
		  62, -5, 60, 0, 63, 5,
		  63, 5, 65, 15, 100, 0
	];

	var mask = new Path();
	var tileCenter = view.center;

	var topLeftEdge = new Point(-4,4);

	mask.moveTo(topLeftEdge);

	//Top
	for (var i = 0; i < bezierCurves.length / 6; i++) {
		var p1 = topLeftEdge + new Point(bezierCurves[i * 6 + 0] * tileRatio, topTab * bezierCurves[i * 6 + 1] * tileRatio);
		var p2 = topLeftEdge + new Point(bezierCurves[i * 6 + 2] * tileRatio, topTab * bezierCurves[i * 6 + 3] * tileRatio);
		var p3 = topLeftEdge + new Point(bezierCurves[i * 6 + 4] * tileRatio, topTab * bezierCurves[i * 6 + 5] * tileRatio);

		mask.cubicCurveTo(p1, p2, p3);
	}
	//Right
	var topRightEdge = topLeftEdge + new Point(tileWidth, 0);
	for (var i = 0; i < bezierCurves.length / 6; i++) {
		var p1 = topRightEdge + new Point(-rightTab * bezierCurves[i * 6 + 1] * tileRatio, bezierCurves[i * 6 + 0] * tileRatio);
		var p2 = topRightEdge + new Point(-rightTab * bezierCurves[i * 6 + 3] * tileRatio, bezierCurves[i * 6 + 2] * tileRatio);
		var p3 = topRightEdge + new Point(-rightTab * bezierCurves[i * 6 + 5] * tileRatio, bezierCurves[i * 6 + 4] * tileRatio);

		mask.cubicCurveTo(p1, p2, p3);
	}
	//Bottom
	var bottomRightEdge = topRightEdge + new Point(0, tileWidth);
	for (var i = 0; i < bezierCurves.length / 6; i++) {
		var p1 = bottomRightEdge - new Point(bezierCurves[i * 6 + 0] * tileRatio, bottomTab * bezierCurves[i * 6 + 1] * tileRatio);
		var p2 = bottomRightEdge - new Point(bezierCurves[i * 6 + 2] * tileRatio, bottomTab * bezierCurves[i * 6 + 3] * tileRatio);
		var p3 = bottomRightEdge - new Point(bezierCurves[i * 6 + 4] * tileRatio, bottomTab * bezierCurves[i * 6 + 5] * tileRatio);

		mask.cubicCurveTo(p1, p2, p3);
	}
	//Left
	var bottomLeftEdge = bottomRightEdge - new Point(tileWidth, 0);
	for (var i = 0; i < bezierCurves.length / 6; i++) {
		var p1 = bottomLeftEdge - new Point(-leftTab * bezierCurves[i * 6 + 1] * tileRatio, bezierCurves[i * 6 + 0] * tileRatio);
		var p2 = bottomLeftEdge - new Point(-leftTab * bezierCurves[i * 6 + 3] * tileRatio, bezierCurves[i * 6 + 2] * tileRatio);
		var p3 = bottomLeftEdge - new Point(-leftTab * bezierCurves[i * 6 + 5] * tileRatio, bezierCurves[i * 6 + 4] * tileRatio);

		mask.cubicCurveTo(p1, p2, p3);
	}

	return mask;
}


 function getTileRaster(sourceImg, tileWidth, offset) {
 // PURPOSE: Create a Raster object for the puzzle piece.  Raster objects are how paper.js represents images.
 //		We need to create a Raster object for each puzzle piece by applying the puzzle piece's image to a Raster 
 // INPUT: sourceImg - The source image for the individual puzzle piece
 //		   tileWidth - The width of the puzzle piece
 //		   offset - The offset dimensions of the puzzle piece from the top left corner of the puzzle
 // OUTPUT: A Raster object that describes the individual puzzle piece image
 
	// Create a new Raster object from the blank image
	var targetRaster = new Raster('empty');
	// Calculate the tile margin width
	var tileMarginWidth = tileWidth * 0.203125;
	// Calculate the total width of the tile
	var tileWithMarginWidth = tileWidth + tileMarginWidth * 2;
	// Get image source data from tile dimensions
	var data = sourceImg.getData(new Rectangle(
		offset.x - tileMarginWidth, 
		offset.y - tileMarginWidth, 
		tileWithMarginWidth, 
		tileWithMarginWidth));
	// Set the Raster's dimension data to the source image data
	targetRaster.setData(data, new Point(0, 0))
	// Update the positioning to make sure the image is centered on the puzzle piece
	targetRaster.position = new Point(28, 36);
	// Return the Raster object
	return targetRaster;
 }
 
 

 JigsawPuzzle.prototype.pickTile = function() {
 // PURPOSE: Handle when the user clicks on a tile.  When this occurs the tile is scaled slightly larger to make it
 //			clear that a tile is selected.  The tile is also ready to be dragged and dropped to place it in the puzzle
 // INPUT: None
 // OUTPUT: Game management - The selected tile is recorded
 
	// Check if there is already a selected tile
	if (this.selectedTile) {
		// If the scale is not defined for the selected tile
		if (!this.selectedTile.lastScale) {
			// Set the scale to the appropriate level for a selected tile
			this.selectedTile.lastScale = this.zoomScaleOnDrag;
			this.selectedTile.scale(this.selectedTile.lastScale);
		}
		// Else if the scale is already defined then the user is trying to release this tile
		else {
			// Check if tile is scaled larger (tile is definitely selected)
			if (this.selectedTile.lastScale > 1) {
				// Release the tile
				this.releaseTile();
				return;
			}
		}

		// Initialize the selected tile's cell position as undefined
		this.selectedTile.cellPosition = undefined;

		// Add the 
		this.selectionGroup = new Group(this.selectedTile);

		var pos = new Point(this.selectedTile.position.x, this.selectedTile.position.y);
		this.selectedTile.position = new Point(0, 0);

		this.selectionGroup.position = pos;
	}
 }
 

 JigsawPuzzle.prototype.releaseTile = function() {
 // PURPOSE: 
 // INPUT: 
 // OUTPUT: 
 
	if (this.selectedTile) {

		var cellPosition = new Point(
			Math.round(this.selectionGroup.position.x / this.tileWidth),
			Math.round(this.selectionGroup.position.y / this.tileWidth));

		var roundPosition = cellPosition * this.tileWidth;
		
		var hasConflict = false;
		
		var alreadyPlacedTile = this.getTileAtCellPosition(cellPosition);

		hasConflict = alreadyPlacedTile;

		var topTile = this.getTileAtCellPosition(cellPosition + new Point(0, -1));
		var rightTile = this.getTileAtCellPosition(cellPosition + new Point(1, 0));
		var bottomTile = this.getTileAtCellPosition(cellPosition + new Point(0, 1));
		var leftTile = this.getTileAtCellPosition(cellPosition + new Point(-1, 0));

		if (topTile) {
			hasConflict = hasConflict || !(topTile.shape.bottomTab + this.selectedTile.shape.topTab == 0);
		}

		if (bottomTile) {
			hasConflict = hasConflict || !(bottomTile.shape.topTab + this.selectedTile.shape.bottomTab == 0);
		}

		if (rightTile) {
			hasConflict = hasConflict || !(rightTile.shape.leftTab + this.selectedTile.shape.rightTab == 0);
		}

		if (leftTile) {
			hasConflict = hasConflict || !(leftTile.shape.rightTab + this.selectedTile.shape.leftTab == 0);
		}

		if (!hasConflict) {

			if (this.selectedTile.lastScale) {
				this.selectedTile.scale(1 / this.selectedTile.lastScale);
				this.selectedTile.lastScale = undefined;
			}

			this.selectionGroup.remove();
			var tile = this.tiles[this.selectedTileIndex];
			tile.position = roundPosition;
			tile.cellPosition = cellPosition;
			this.selectionGroup.remove();
			this.selectedTile =
			this.selectionGroup = null;
			project.activeLayer.addChild(tile);

			var errors = this.checkTiles();
			if (errors == 0) {
				// Change this to signal to main window that the minigame was completed successfully
				alert('Congratulations!!!');
				parent.postMessage({'success':true}, "*");
			}
		}
	}
 }

 JigsawPuzzle.prototype.getTileAtCellPosition = function(point) {
	var width = this.tilesPerRow;
	var height = this.tilesPerColumn;
	var tile = undefined;
	for (var i = 0; i < this.tiles.length; i++) {
		if (this.tiles[i].cellPosition == point) {
			tile = this.tiles[i];
			break;
		}
	}
	return tile;
 }


 JigsawPuzzle.prototype.dragTile = function(delta) {
	if (this.selectedTile) {
		this.selectionGroup.position += delta;
		this.selectedTile.opacity = 1;
	}
	else {
		var currentScroll = view.currentScroll - delta * this.currentZoom;
		view.scrollBy(currentScroll);
		view.currentScroll = currentScroll;
	}
 }

 JigsawPuzzle.prototype.mouseMove = function(point, delta) {
	if (!this.selectionGroup) {
		project.activeLayer.selected = false;
		if (delta.x < 8 && delta.y < 8) {
			var tolerance = this.tileWidth * .5;
			var hit = false;
			for (var index = 0; index < this.tiles.length; index++) {
				var tile = this.tiles[index];
				var tileCenter = tile.position;
				var deltaPoint = tileCenter - point;
				hit = (deltaPoint.x * deltaPoint.x + 
							deltaPoint.y * deltaPoint.y) < tolerance * tolerance;

				if (hit) {
					this.selectedTile = tile;
					this.selectedTileIndex = index;
					tile.opacity = .5;
					project.activeLayer.addChild(tile);
					return;
				}
				else {
					tile.opacity = 1;
				}
			}
			if (!hit)
				this.selectedTile = null;
		}
	}
	else {
		this.dragTile(delta);
	}
 }

 JigsawPuzzle.prototype.zoom = function(zoomDelta) {
	var newZoom = this.currentZoom + zoomDelta;
	if (newZoom >= 0.3 && newZoom <= 1) {
		view.zoom = 
		this.currentZoom = newZoom;
	}
 }

 
 JigsawPuzzle.prototype.checkTiles = function() {
	var errors = 0;
	var firstTile = this.tiles[0];
	var firstCellPosition = firstTile.cellPosition;

	for (var y = 0; y < this.tilesPerColumn; y++) {
		for (var x = 0; x < this.tilesPerRow; x++) {
			var index = y * this.tilesPerRow + x;
			var cellPosition = this.tiles[index].cellPosition;

			if (cellPosition != firstCellPosition + new Point(x, y)) {
				errors++;
			}
		}
	}

	return errors;
}
 
view.currentScroll = new Point(0, 0);
var scrollVector = new Point(0,0);
var scrollMargin = 32;

var path;
var movePath = false;

 $(document).ready(function(){
	puzzle = new JigsawPuzzle();
	puzzle.zoom(-.3);
	
	$('.zoomIn').click(function() {
		puzzle.zoom(.1);
	});

	$('.zoomOut').click(function() {
		puzzle.zoom(-.1);
	});

	$('.help').click(function() {
		$('.canvas').toggle();
		$('.puzzle-image').toggle();
	});

	var charmsWidth = $('.charms').css('width').replace('px', '');
	$('.puzzle-image').css('margin', '-' + puzzle.imgHeight/2 + 'px 0 0 -' + puzzle.imgWidth/2 + 'px');
 });

// Paper.js onMouseDown event handler
function onMouseDown(event) {
	puzzle.pickTile();
}

// Paper.js onMouseUp event handler
function onMouseUp(event) {
	puzzle.releaseTile();
}

// Paper.js onMouseMove event handler
function onMouseMove(event) {
	puzzle.mouseMove(event.point, event.delta);

	if (event.point.x < scrollMargin) {
		scrollVector = new Point(scrollMargin - event.point.x, 0);
	}
	else {
		scrollVector = new Point(0, 0);
	}
}

// Paper.js onMouseDrag event handler
function onMouseDrag(event) {
	puzzle.dragTile(event.delta);
}