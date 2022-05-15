import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatus } from './entities/post-status.entity';
import { Post } from './entities/post.entity';
import { PostStatusOptions } from './enums';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(PostStatus)
    private readonly postStatusRepository: Repository<PostStatus>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async updatePostStatus(
    id: number,
    status: PostStatusOptions,
  ): Promise<PostStatus> {
    const postStatus = await this.postStatusRepository.preload({
      id,
      status,
    });

    if (!postStatus) {
      throw new NotFoundException(`Post Status #${id} not found`);
    }

    return this.postStatusRepository.save(postStatus);
  }
}
