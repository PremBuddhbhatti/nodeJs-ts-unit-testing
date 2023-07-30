import { DataBase } from '../../../app/server_app/data/DataBase';
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

type someTypeWithId = {
	id: string;
	name: string;
	color: string;
};
describe('DataBase test suite', () => {
	let sut: DataBase<someTypeWithId>;

	const fakeId = '1234';

	const someObject = {
		id: '',
		name: 'someName',
		color: 'black',
	};

	const someObject2 = {
		id: '',
		name: 'someName',
		color: 'black',
	};
	beforeEach(() => {
		sut = new DataBase<someTypeWithId>();
		jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
	});

	it('should return id after insert', async () => {
		const actual = await sut.insert({ id: '' } as any);

		expect(actual).toBe(fakeId);
	});

	it('should get element after insert', async () => {
		const id = await sut.insert(someObject);
		const actual = await sut.getBy('id', id);
		expect(actual).toBe(someObject);
	});

	it('should find all elements with same prop', async () => {
		await sut.insert(someObject);
		await sut.insert(someObject2);

		const expected = [someObject, someObject2];

		const actual = await sut.findAllBy('color', 'black');
		expect(actual).toEqual(expected);
	});

	it('should change color', async () => {
		const id = await sut.insert(someObject);
		const expectedColor = 'red';

		await sut.update(id, 'color', expectedColor);
		const object = await sut.getBy('id', id);
		const actualColor = object.color;

		expect(actualColor).toBe(expectedColor);
	});

	it('should delete object', async () => {
		const id = await sut.insert(someObject);
		await sut.delete(id);
		const actual = await sut.getBy('id', id);

		expect(actual).toBeUndefined();
	});

	it('should return all elements', async () => {
		await sut.insert(someObject);
		await sut.insert(someObject2);

		const expected = [someObject, someObject2];

		const actual = await sut.getAllElements();
		expect(actual).toEqual(expected);
	});
});
