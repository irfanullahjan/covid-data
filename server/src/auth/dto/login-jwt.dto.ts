export class LoginJwtDto {
  accessToken: string;

  constructor(data: Partial<LoginJwtDto> = {}) {
    Object.assign(this, data);
  }
}
