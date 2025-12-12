import { Injectable } from '@nestjs/common';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';
import { TemperatureSensor } from './entities/temperature-sensor.entity';

@Injectable()
export class TemperatureSensorsService {
  private sensors: TemperatureSensor[] = [];
  private idCounter = 1;

  create(dto: CreateTemperatureSensorDto) {
    const newSensor: TemperatureSensor = {
      id: this.idCounter++,
      value: dto.value,
      timestamp: new Date(),
    };
    this.sensors.push(newSensor);
    return newSensor;
  }

  findAll() {
    return this.sensors;
  }

  findOne(id: number) {
    return this.sensors.find((s) => s.id === id);
  }

  update(id: number, dto: UpdateTemperatureSensorDto) {
    const sensor = this.findOne(id);
    if (!sensor) return null;

    if (dto.value !== undefined) sensor.value = dto.value;
    sensor.timestamp = new Date();
    return sensor;
  }

  remove(id: number) {
    const index = this.sensors.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const removed = this.sensors[index];
    this.sensors.splice(index, 1);
    return removed;
  }
}
