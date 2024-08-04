import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ISendSMSResponse } from '../interfaces';

@Injectable()
export class Requests {
  async sendSmsCode(code: string, phone: string): Promise<ISendSMSResponse> {
    const smsServiceEmail = process.env.SMS_SERVICE_EMAIL;
    const smsServiceApiKey = process.env.SMS_SERVICE_API_KEY;
    const smsServiceSign = process.env.SMS_SERVICE_SIGN;

    try {
      const response = await axios.get(
        `https://${smsServiceEmail}:${smsServiceApiKey}@gate.smsaero.ru/v2/sms/send?number=${phone}&text=Код+подтверждения:+${code}&sign=${smsServiceSign}`,
        {
          auth: {
            username: smsServiceEmail,
            password: smsServiceApiKey,
          },
        }
      );
      return response.data;
    } catch (e) {
      throw new BadRequestException(e.response.data.message);
    }
  }
}
