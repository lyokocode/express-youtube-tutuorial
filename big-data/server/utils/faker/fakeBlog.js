import { faker } from '@faker-js/faker';
import { Blog } from '../../models/Blog.js'; // Blog modelini doğru yere göre import edin

function createRandomBlog() {
    return {
        slug: faker.person.fullName(),
        title: faker.internet.userName(),
        content: faker.lorem.paragraph(),
        excerpt: faker.lorem.paragraph(),
        image: faker.image.avatar(),
        status: faker.datatype.boolean(),
        tags: faker.internet.url(),
        views: faker.lorem.paragraph(),
        likes: faker.lorem.paragraph(),
        comments: faker.lorem.paragraph(),
        UserId: faker.datatype.number({ min: 0, max: 12562 })
    };
}

const generateFakeBlog = async () => {
    const count = 500
    try {
        // 300 kullanıcı oluştur
        for (let i = 0; i < count; i++) {
            // Sahte kullanıcı verilerini oluştur
            const fakeBlog = createRandomBlog();

            // Oluşturulan sahte kullanıcıyı veritabanına kaydet
            await Blog.create(fakeBlog);
        }

        console.log(`${count} sahte blog oluşturuldu.`);
    } catch (error) {
        console.error("bloglar oluşturulurken bir hata oluştu:", error);
    }
};

// Sahte kullanıcıları oluştur
generateFakeBlog();
