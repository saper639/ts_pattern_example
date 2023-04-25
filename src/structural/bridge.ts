interface IProvider {
	sendMessage(message: string): void;
	connect(config: unknown): void;
	disconnect(): void;
}

class TelegramProvider implements IProvider{
	sendMessage(message: string): void {
		console.log(message);
	}
	connect(config: string): void {
		console.log(config);
	}
	disconnect(): void {
		console.log('Disconnected TG');
	}
}

class WhatsAppProvider implements IProvider{
	sendMessage(message: string): void {
		console.log(message);
	}
	connect(config: string): void {
		console.log(config);
	}
	disconnect(): void {
		console.log('Disconnected WA');
	}
}

class NotificationSender {
	constructor (private provider: IProvider) {}

	send(message: string) {
		this.provider.connect('connect');
		this.provider.sendMessage(message);
		this.provider.disconnect;
	}
}

class DelayNotificationSender extends NotificationSender {
	constructor (provider: IProvider) {
		super(provider)
	}

	sendDelayed(message: string, ms: number) {		
		setTimeout( () => this.send(message), ms);
	}
}

const sender = new NotificationSender(new TelegramProvider());
sender.send('Message 1');

const sender2 = new NotificationSender(new WhatsAppProvider());
sender2.send('Message 2');

const sender3 = new DelayNotificationSender(new TelegramProvider());
sender3.sendDelayed('Message 3', 5000);

class Pricol implements IProvider {
	sendMessage(message: string): void {
		throw new Error("Method not implemented.");
	}
	connect(config: unknown): void {
		throw new Error("Method not implemented.");
	}
	disconnect(): void {
		throw new Error("Method not implemented.");
	}

}
