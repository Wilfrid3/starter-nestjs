import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StringArraySupportOption } from 'prettier';
import { TypePostService } from 'src/type-post/type-post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly typepostService: TypePostService
  ) { }

  async create(createPostDto: CreatePostDto, file: Express.Multer.File) {
    if (file) {
      createPostDto['image'] = file.path.split("/")[2];
    }
    const type = await this.typepostService.findById(createPostDto.typepostId);
    const post = new this.postModel(createPostDto);
    post.typepost = type._id;
    await post.save();

    return {
      status: "success",
      message: "Post successfully created.",
      data: post,
    }
  }

  async findAll() {
    const posts = await this.postModel.find().populate(['typepost'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: posts,
    }
  }

  async findById(id: string) {
    const post = await this.postModel.findById(id).populate(['typepost'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getPostById error', err)
      });

    if (!post) {
      throw new HttpException('Post Not found 56', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).populate(['typepost'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getPostById error', err)
      });

    if (!post) {
      throw new HttpException('Post Not found 56', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, file: Express.Multer.File) {
    if (file) {
      updatePostDto['image'] = file.path.split("/")[2];
    }

    const post = await this.findById(id)
    if (!post) {
      throw new HttpException('Vehicle Not found', HttpStatus.NOT_FOUND);
    }
    const updatePost = await this.postModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updatePostDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update post error', error)
        return error;
      })

    if (updatePostDto.typepostId) {
      const type = await this.typepostService.findById(updatePostDto.typepostId);
      updatePost.typepost = type._id
    }
    updatePost.save();

    const newPost = await this.findById(id)

    return {
      status: 'success',
      message: `Post ${newPost.name} successfully updated.`,
      data: newPost,
    }
  }

  async remove(id: string) {
    const post = await this.findById(id)
    if (!post) {
      throw new HttpException('Post Not found', HttpStatus.NOT_FOUND);
    }
    await this.postModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Post successfully deleted.",
    }
  }
}
