import { faker } from '@faker-js/faker';
import { User } from '../../models/User.js';

function createRandomUser() {
    return {
        fullName: faker.person.fullName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.datatype.boolean(),
        isVerified: faker.datatype.boolean(),
        profilePicture: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        website: faker.internet.url(),
        birthDate: faker.date.birthdate(),
        gender: faker.person.gender(),
        phoneNumber: faker.phone.imei(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
        },
        interests: [faker.word.adjective(5), faker.word.adjective(5), faker.word.adjective(5)],
        occupation: faker.person.jobTitle(),
        education: faker.helpers.arrayElement(['High School', 'College', 'University']),
        relationshipStatus: faker.helpers.arrayElement(['single', 'in_relationship', 'engaged', 'married', 'divorced', 'widowed', 'complicated']),
        socialMedia: {
            facebook: faker.internet.url(),
            twitter: faker.internet.url(),
            linkedin: faker.internet.url(),
        },
        skills: [faker.word.adjective(5), faker.word.adjective(5), faker.word.adjective(5)],
        hobbies: [faker.word.adjective(5), faker.word.adjective(5), faker.word.adjective(5)],
    };
}

const generateFakeUsers = async () => {
    const count = 500
    try {
        // 300 kullanıcı oluştur
        for (let i = 0; i < count; i++) {
            // Sahte kullanıcı verilerini oluştur
            const fakeUser = createRandomUser();

            // Oluşturulan sahte kullanıcıyı veritabanına kaydet
            await User.create(fakeUser);
        }

        console.log(`${count} sahte kullanıcı oluşturuldu.`);
    } catch (error) {
        console.error("Kullanıcılar oluşturulurken bir hata oluştu:", error);
    }
};

// Sahte kullanıcıları oluştur
generateFakeUsers();
