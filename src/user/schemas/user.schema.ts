import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  cpf: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  password: string;
}
