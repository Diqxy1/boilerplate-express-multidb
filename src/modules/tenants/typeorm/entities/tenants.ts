import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenants')
class Tentans {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  domain: string;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Tentans;
