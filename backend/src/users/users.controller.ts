import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {

	/**
	 * constructor
	 */
	constructor(private readonly usersService: UsersService) { }

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(@Body() createUserDto: CreateUserDto): Promise<object> {

		try {

			const user: User = await this.usersService.create(createUserDto);

			return {

				ok: true,

				id: user.id
			};
		}

		catch (err) {

			throw new HttpException({

				ok: false,

				error: err.message
			}, HttpStatus.OK);
		}
	}

	@Get()
	async findAll(): Promise<object> {

		const users: User[] = await this.usersService.findAll();

		return {

			ok: true,

			data: users
		};
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<object> {

		const user: User = await this.usersService.findOne(+id);

		return {

			ok: true,

			data: user ? [user] : []
		};
	}

	@Patch(':id')
	@UsePipes(new ValidationPipe({ transform: true }))
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<object> {

		try {

			const user: User = await this.usersService.update(+id, updateUserDto);

			return {

				ok: true,

				id: user.id
			};
		}

		catch (err) {

			throw new HttpException({

				ok: false,

				error: err.message
			}, HttpStatus.OK);
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<object> {

		try {

			const user: User = await this.usersService.remove(+id);

			return {

				ok: true,

				id: user.id
			};
		}

		catch (err) {

			throw new HttpException({

				ok: false,

				error: err.message
			}, HttpStatus.OK);
		}
	}
}
