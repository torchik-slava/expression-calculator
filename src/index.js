function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
	let ob = expr.match(/\(/g);
	let cb = expr.match(/\)/g);
	if((ob && !cb) || (cb && !ob) || ( ob && cb && ob.length != cb.length)) throw new Error('ExpressionError: Brackets must be paired');  
	
  function priority_count(expr){		
		let str = expr;
		while (str.match(/\([^\(\)]+\)/)) {
			let simple_expr = str.match(/\([^\(\)]+\)/);
			let arr = simple_expr[0].slice(3,-3).split(' ');		
			simple_count(arr);
			str = str.replace(/\([^\(\)]+\)/, arr[0]);
		}
		let arr;
		str.indexOf(' ') != -1 ? arr = str.split(' ') : arr = str.split('');		
		arr = arr.filter(item => item != ''); //for arrays like ['', '1', '+' ...] from str like ' 1+2 ' or ' 1 + 2 ' 		
		simple_count(arr);
		return arr[0];  
	}

	function simple_count (arr) {
		for (let i=1; i<arr.length-1; i++){
			if(arr[i]==='*'){
				arr[i-1] = arr[i-1]*arr[i+1];
				arr.splice(i,2);
				i--;
			}
			if(arr[i]==='/'){
				if (arr[i-1]/arr[i+1] == Infinity) throw new Error('TypeError: Division by zero.');
				arr[i-1] = arr[i-1]/arr[i+1];
				arr.splice(i,2);
				i--;
			}
		}     
		for (let i=1; i<arr.length-1; i++){
			if(arr[i]==='-'){
				arr[i-1] = arr[i-1]-arr[i+1];
				arr.splice(i,2);
				i--;        
			}
			if(arr[i]==='+'){
				arr[i-1] = Number(arr[i-1])+Number(arr[i+1]);
				arr.splice(i,2);
				i--;        
			}
		}    
	}	 
	return priority_count(expr);
}

module.exports = {
    expressionCalculator
}