import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination, DestinationDocument } from './schemas/destination.schema';

@Injectable()
export class DestinationService {

  constructor(@InjectModel(Destination.name) private destinationModel: Model<DestinationDocument>) { }

  async create(createDestinationDto: CreateDestinationDto) {
    try {
      const dest = await this.findByDepart(createDestinationDto);
      if (dest !== null) {
        const newDestination = new this.destinationModel(createDestinationDto);
        await newDestination.save();

        return {
          status: "success",
          message: "Destination successfully created.",
          data: newDestination,
        }
      }

      return {
        status: "false",
        message: "Destination already exist.",
        data: dest,
      }
    } catch (error) {
      return {
        status: "false",
        message: error,
        data: null,
      }
    }
  }

  async findByDepart(createDestinationDto: CreateDestinationDto) {
    const destination = await this.destinationModel.find({ 'depart': createDestinationDto.depart, 'arrival': createDestinationDto.arrival }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDestinationById error', err)
      });

    if (!destination) {
      return null;
    }

    return destination;
  }

  async findById(id: string) {
    const destination = await this.destinationModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDestinationById error', err)
      });

    if (!destination) {
      throw new HttpException('Destination Not found 56', HttpStatus.NOT_FOUND);
    }

    return destination;
  }


  async findAll() {
    const destinations = await this.destinationModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
    let res = [];
    if (destinations.length > 0) {
      await Promise.all(destinations.map(async (elem) => {
        res.push({ label: `${elem.depart}-${elem.arrival}`, value: elem._id });
      }));
    }

    return {
      status: 'success',
      data: res,
    };
  }

  async findOne(id: string) {
    const destination = await this.destinationModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDestinationById error', err)
      });

    if (!destination) {
      throw new HttpException('Destination Not found 56', HttpStatus.NOT_FOUND);
    }

    return destination;
  }

  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    try {
      const updateDest = await this.destinationModel.findByIdAndUpdate(id, {
        $set: { ...updateDestinationDto },
      });

      const destination = await this.findById(id);
      return {
        status: "success",
        message: "Destination successfully updated.",
        data: destination,
      }
    } catch (error) {
      return {
        status: "false",
        message: error,
        data: null,
      }
    }
  }

  async remove(id: string) {
    return await this.destinationModel.findByIdAndDelete(id);
  }
}
