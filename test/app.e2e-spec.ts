import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService); //ou o get
    await prisma.publication.deleteMany();
    await prisma.post.deleteMany();
    await prisma.media.deleteMany();

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });

  it("POST /medias", async () => {
    await request(app.getHttpServer())
      .post("/medias")
      .send({
        title: "Instagram",
        username: "myusername",
      })
      .expect(201);

    const medias = await prisma.media.findMany();
    expect(medias).toHaveLength(1);
    const media = medias[0];
    expect(media).toEqual({
      id: expect.any(Number),
      title: "Instagram",
      username: "myusername"
    });

  });

  it("GET /medias", async () => {
    await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    const response = await request(app.getHttpServer()).get("/medias");
    expect((response.statusCode)).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual([{
      id: expect.any(Number),
      title: "Instagram",
      username: "myusername"
    }])
  });

  it("GET /medias/:id", async () => {
    const media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    const response = await request(app.getHttpServer()).get(`/medias/${media.id}`);
    expect((response.statusCode)).toBe(200);
    expect(response.body).toEqual({
      id: media.id,
      title: "Instagram",
      username: "myusername"
    })
  });

  it("PUT /medias/:id", async () => {
    const media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    await request(app.getHttpServer())
      .put(`/medias/${media.id}`)
      .send({
        title: "Instagram2",
        username: "myusername2",
      })
      .expect(200);

    const response = await request(app.getHttpServer()).get(`/medias/${media.id}`);
    expect((response.statusCode)).toBe(200);
    expect(response.body).toEqual({
      id: media.id,
      title: "Instagram2",
      username: "myusername2"
    })
  });

  it("DELETE /medias/:id", async () => {
    const media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    const response = await request(app.getHttpServer()).delete(`/medias/${media.id}`);
    expect(response.statusCode).toBe(200);

    const verifyResponse = await request(app.getHttpServer()).get(`/medias/${media.id}`);
    expect(verifyResponse.statusCode).toBe(404);
  });

  it("POST /posts", async () => {
    await request(app.getHttpServer())
      .post("/posts")
      .send({
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea",
      })
      .expect(201);

    const posts = await prisma.post.findMany();
    expect(posts).toHaveLength(1);
    const post = posts[0];
    expect(post).toEqual({
      id: expect.any(Number),
      title: "Why you should have a guinea pig?",
      text: "https://www.guineapigs.com/why-you-should-guinea",
      image: null
    });

  });

  it("GET /posts", async () => {
    await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea",
      }
    });

    const response = await request(app.getHttpServer()).get("/posts");
    expect((response.statusCode)).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual([{
      id: expect.any(Number),
      title: "Why you should have a guinea pig?",
      text: "https://www.guineapigs.com/why-you-should-guinea",
      image: null
    }])
  });

  it("GET /posts/:id", async () => {
    const post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea",
      }
    });

    const response = await request(app.getHttpServer()).get(`/posts/${post.id}`);
    expect((response.statusCode)).toBe(200);
    expect(response.body).toEqual({
      id: post.id,
      title: "Why you should have a guinea pig?",
      text: "https://www.guineapigs.com/why-you-should-guinea",
      image: null
    })
  });

  it("PUT /posts/:id", async () => {
    const post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea"
      }
    });

    await request(app.getHttpServer())
      .put(`/posts/${post.id}`)
      .send({
        title: "Teste",
        text: "https://www.testes.com/"
      })
      .expect(200);

    const response = await request(app.getHttpServer()).get(`/posts/${post.id}`);
    expect((response.statusCode)).toBe(200);
    expect(response.body).toEqual({
      id: post.id,
      title: "Teste",
      text: "https://www.testes.com/",
      image: null
    })
  });

  it("DELETE /posts/:id", async () => {
    const post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea"
      }
    });

    const response = await request(app.getHttpServer()).delete(`/posts/${post.id}`);
    expect(response.statusCode).toBe(200);

    const verifyResponse = await request(app.getHttpServer()).get(`/posts/${post.id}`);
    expect(verifyResponse.statusCode).toBe(404);
  });










  it("POST /publications", async () => {
    const media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    const post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea"
      }
    });

    await request(app.getHttpServer())
      .post("/publications")
      .send({
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-29T13:25:17.352Z"
      })
      .expect(201);

    const publications = await prisma.publication.findMany();
    expect(publications).toHaveLength(1);
    const publication = publications[0];
    expect(publication).toEqual({
      id: expect.any(Number),
      mediaId: media.id,
      postId: post.id,
      date: expect.any(Date)
    });

  });

  it("GET /publications", async () => {
    const media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    const post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea"
      }
    }); 
    await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-29T13:25:17.352Z"
      }
    });

    const response = await request(app.getHttpServer()).get("/publications");
    expect((response.statusCode)).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual([{
      id: expect.any(Number),
      mediaId: media.id,
      postId: post.id,
      date: "2023-08-29T13:25:17.352Z"
    }])
  });

  it("GET /publications/:id", async () => {
    const media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    const post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea"
      }
    });
    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-29T13:25:17.352Z"
      }
    });

    const response = await request(app.getHttpServer()).get(`/publications/${publication.id}`);
    expect((response.statusCode)).toBe(200);
    expect(response.body).toEqual({
      id: publication.id,
      mediaId: media.id,
      postId: post.id,
      date: "2023-08-29T13:25:17.352Z"
    })
  });

  it("PUT /publications/:id", async () => {
    const media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    const post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea"
      }
    });
    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-29T13:25:17.352Z"
      }
    });

    await request(app.getHttpServer())
      .put(`/publications/${publication.id}`)
      .send({
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-30T13:25:17.352Z"
      })
      .expect(200);

    const response = await request(app.getHttpServer()).get(`/publications/${publication.id}`);
    expect((response.statusCode)).toBe(200);
    expect(response.body).toEqual({
      id: publication.id,
      mediaId: media.id,
      postId: post.id,
      date: "2023-08-30T13:25:17.352Z"
    })
  });

  it("DELETE /publications/:id", async () => {
    const media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername",
      }
    });

    const post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea"
      }
    });
    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-29T13:25:17.352Z"
      }
    });

    const response = await request(app.getHttpServer()).delete(`/publications/${publication.id}`);
    expect(response.statusCode).toBe(200);

    const verifyResponse = await request(app.getHttpServer()).get(`/publications/${publication.id}`);
    expect(verifyResponse.statusCode).toBe(404);
  });

});