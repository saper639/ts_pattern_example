class User {
	constructor (public userId: number) {}
}

class CommandHistory {
	public commands: Command[] = [];

	push(command: Command)  {
		this.commands.push(command);
	}
	remove(command: Command) {
		this.commands = this.commands.filter(c => c.commandId != command.commandId);
	}
}

abstract class Command {
	public commandId: number;

	abstract execute(): void;
	
	constructor(public history: CommandHistory) {
		this.commandId = Math.random();
	}
}

class AddUserCommand extends Command {
	constructor(
		private user: User, 
		private reciever: UserService, 
		history: CommandHistory
	) {
		super(history);
	}
	execute(): void {
		this.reciever.saveUser(this.user);
		this.history.push(this);

	}

	undo(): void {
		this.reciever.deleteUser(this.user.userId);
		this.history.remove(this);
	}
}

class UserService {
	saveUser(user: User) {
		console.log(`Сохраняю пользователя с id ${user.userId}`);
	}

	deleteUser(userId: number) {
		console.log(`Удаляем пользователя с id ${userId}`);
	}
}

class MyController {
	reciever: UserService;
	history: CommandHistory = new CommandHistory();

	addReceiver(reciever: UserService) {
		this.reciever = reciever;
	}
	run() {
		const addUserCommand = new AddUserCommand(
			new User(1), 
			this.reciever, 
			this.history
		);
		addUserCommand.execute();
		console.log(addUserCommand.history);
		addUserCommand.undo();
		console.log(addUserCommand.history);
	}
}

const mycontroller = new MyController();
mycontroller.addReceiver(new UserService());
mycontroller.run();