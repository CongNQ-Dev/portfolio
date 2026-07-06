/**
 * ProfileController — handles GET /api/profile
 *
 * PRESENTATION LAYER RULE: controllers are thin. They handle HTTP concerns
 * (routing, status codes, exceptions) and delegate all business logic to the
 * application service. No database code here.
 *
 * @ApiTags and @ApiOperation feed the auto-generated Swagger docs at /api/docs.
 */
import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../../application/profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get the portfolio owner profile' })
  async getProfile() {
    const profile = await this.profileService.getProfile();
    if (!profile) {
      throw new NotFoundException('Profile not found. Run npm run db:seed to populate the database.');
    }
    return profile;
  }
}
