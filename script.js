$(() => {

	/* game settings */

	const mapWidth = 10;
	const mapHeight = 10;
	const winLength = 5;
	let checkSight = false;

	/* field generation */

	for (let x = 1; x <= mapWidth; x++) {
		for (let y = 1; y <= mapHeight; y++) {
			$('<div></div>')
			.addClass('field')
			.attr('id', 'field' + x.toString() + '-' + y.toString())
			.data('x', x)
			.data('y', y)
			.css({ left:(x - 1) * 50, top:(y - 1) * 50 })
			.appendTo('#map')
		}
	}

	/* game logic */

	$('.field').on('click',function(){
		if ($(this).hasClass('field-criss') || $(this).hasClass('field-cross')) {
			return;
		};
		checkSight =! checkSight;
		$(this).addClass(checkSight ? 'field-criss' : 'field-cross');
		
		let check = (x, y) => {
			return $('#field' + x.toString() + '-' + y.toString())
				.hasClass(checkSight ? 'field-criss' : 'field-cross')
		}

		let directions = [
			{ x:1, y:0 },
			{ x:0, y:1 },
			{ x:1, y:1 },
			{ x:-1, y:1 }
		];

		let startX = parseInt($(this).data('x'));
		let startY = parseInt($(this).data('y'));
		
		for (let i = 0; i < directions.length; i++) {
			let sum = 0;
			$.each([-1, 1],
				(index, offset) => {
					let x = startX;
					let y = startY;
					do{
						x += directions[i].x * offset;
						y += directions[i].y * offset;
						sum++;
					}while(
						check(x, y)
					)
				}
			);
			if(sum - 1 >= winLength){
				alert('победили: ' + (checkSight ? 'нули' : 'кресты'));
				$('.field').off('click');
				$('.field').addClass('game-over');
			}
		};						
	});
});