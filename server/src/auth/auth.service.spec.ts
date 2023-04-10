import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUser', () => {
    it('should call userService.findOne', async () => {
      const email = 'abc@example.com';
      service.getUserById(email);
      expect(mockUserService.findOne).toBeCalledWith(email);
    });

    it('should return undefined if no email is provided', async () => {
      const email = undefined;
      const result = service.getUserById(email);
      expect(result).toBeUndefined();
    });
  });

  describe('validateUser', () => {
    it('should call userService.findOne', async () => {
      const email = 'abc@example.com';
      const password = 'password';
      service.validateUser(email, password);
      expect(mockUserService.findOne).toBeCalledWith(email);
    });
  });

  describe('loginJwt', () => {
    it('should call validateUser', async () => {
      const dto = {
        email: 'abc@example.com',
        password: 'password',
      };
      const spy = jest.spyOn(service, 'validateUser');
      try {
        await service.loginJwt(dto);
      } catch (e) {
        // ignore invalid credentials
      }
      expect(spy).toBeCalledWith(dto.email, dto.password);
    });
  });
});
