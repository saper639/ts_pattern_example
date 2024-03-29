interface IMiddleware {
	next(mid: IMiddleware) : IMiddleware;
	handle(request: any) : any;
}

abstract class AbstarctMiddleware implements IMiddleware{
	private nextMiddleware : IMiddleware;

	next(mid: IMiddleware): IMiddleware {
		this.nextMiddleware = mid;
		return mid;
	}

	handle(request: any) {
		if (this.nextMiddleware) {
			return this.nextMiddleware.handle(request);
		}
		return;
	}
}	

class AuthMiddleware extends AbstarctMiddleware{
	override handle(request: any) {
		console.log('AuthMiddleware');
		if (request.userId == 1) {
			return super.handle(request);
		}
		return { error: 'Вы не авторизованны'}
	}
}

class ValidateMiddleware extends AbstarctMiddleware {
	override handle(request: any) {
		console.log('ValidateMiddleware');
		if (request.body) {
			return super.handle(request);
		}
		return { error: 'Нет body'}
	}
}

class Controller extends AbstarctMiddleware {
	override handle(request: any) {
		console.log('Controller');
		return { success: request}
	}
}

const controller = new Controller();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();

auth.next(validate).next(controller);

//not correct userId
console.log(auth.handle({
	userId: 3
}));
//not correct body
console.log(auth.handle({
	userId: 1
}));
//correct
console.log(auth.handle({
	userId: 1,
	body: 'I am Ok'
}));