import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IsNull } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

	/**
	 * create
	 */
	async create(createUserDto: CreateUserDto): Promise<User> {

		const cUser: User = await User.findOne({

			where: {

				hkid: createUserDto.hkid
			}
		});

		if (typeof cUser !== 'undefined') {

			throw new Error('duplicated hkid');
		}

		const user: User = new User();

		Object.assign(user, {

			...createUserDto,

			createdAt: new Date(),

			updatedAt: new Date()
		});

		await user.save();

		return user;
	}

	/**
	 * get all
	 */
	async findAll(): Promise<User[]> {

		const users: User[] = await User.find({

			where: {

				deletedAt: IsNull()
			}
		});

		return users;
	}

	/**
	 * get one
	 */
	async findOne(id: number): Promise<User> {

		const user: User = await User.findOne({

			where: {

				id: id,

				deletedAt: IsNull()
			}
		});

		return user;
	}

	/**
	 * update
	 */
	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

		const user: User = await this.findOne(id);

		if (typeof user === 'undefined') {

			throw new Error('user not found');
		}

		Object.assign(user, {

			...updateUserDto,

			updatedAt: new Date()
		});

		await user.save();

		return user;
	}

	/**
	 * delete
	 */
	async remove(id: number): Promise<User> {

		const user: User = await this.findOne(id);

		if (typeof user === 'undefined') {

			throw new Error('user not found');
		}

		Object.assign(user, {

			deletedAt: new Date()
		});

		await user.save();

		return user;
	}
}
