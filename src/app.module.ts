import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { FarmsModule } from './farms/farms.module';
import { PerimissionModule } from './perimission/perimission.module';
import { ProfilModule } from './profil/profil.module';
import { FarmersModule } from './farmers/farmers.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { TypequipmentsModule } from './typequipments/typequipments.module';
import { StoresModule } from './stores/stores.module';
import { LaboratoriesModule } from './laboratories/laboratories.module';
import { DiseasesModule } from './diseases/diseases.module';
import { PlanningModule } from './planning/planning.module';
import { DaysModule } from './days/days.module';
import { PlagesModule } from './plages/plages.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { UnityModule } from './unity/unity.module';
import { CurrencyModule } from './currency/currency.module';
import { OrderModule } from './order/order.module';
import { AppointmentModule } from './appointment/appointment.module';
import { DataEquipmentModule } from './data-equipment/data-equipment.module';
import { AgroExpertModule } from './agro-expert/agro-expert.module';
import { PlantTypeModule } from './plant-type/plant-type.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { GalleryModule } from './gallery/gallery.module';
import { SheetModule } from './sheet/sheet.module';
import { SeedProducerModule } from './seed-producer/seed-producer.module';
import { MainCategoryModule } from './main-category/main-category.module';
import { SensorModule } from './sensor/sensor.module';
import { TypeDataModule } from './type-data/type-data.module';
import { NotificationModule } from './notification/notification.module';
import { AddressModule } from './address/address.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PacksModule } from './packs/packs.module';
import { DocumentsModule } from './documents/documents.module';
import { DeliveryModule } from './delivery/delivery.module';
import { PlantDiseaseModule } from './plant-disease/plant-disease.module';
import { PartnerModule } from './partner/partner.module';
import { ContactModule } from './contact/contact.module';
import { RecipientModule } from './recipient/recipient.module';
import { TypevehicleModule } from './typevehicle/typevehicle.module';
import { DestinationModule } from './destination/destination.module';
import { CostModule } from './cost/cost.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TransporterModule } from './transporter/transporter.module';
import { TutorialModule } from './tutorial/tutorial.module';
import { TypePostModule } from './type-post/type-post.module';
import { PostModule } from './post/post.module';
import { InvoiceModule } from './invoice/invoice.module';
import { LocationModule } from './location/location.module';
import { PackageModule } from './package/package.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // 'mongodb+srv://kaliodev:kaliodev@kaiodevcluster.1my9s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      // 'mongodb+srv://sieweive:vWOZUKLve8TRmB3u@cluster0.m2eptzf.mongodb.net/kaya'
      'mongodb+srv://sieweive:teHdxcGcv8zDifEU@cluster0.m2eptzf.mongodb.net/kaya?retryWrites=true&w=majority'
    ),
    UsersModule,
    ServicesModule,
    FarmsModule,
    PerimissionModule,
    ProfilModule,
    FarmersModule,
    EquipmentsModule,
    TypequipmentsModule,
    StoresModule,
    LaboratoriesModule,
    DiseasesModule,
    PlanningModule,
    DaysModule,
    PlagesModule,
    ProductsModule,
    CategoryModule,
    UnityModule,
    CurrencyModule,
    OrderModule,
    AppointmentModule,
    DataEquipmentModule,
    AgroExpertModule,
    PlantTypeModule,
    SpecialitiesModule,
    GalleryModule,
    SheetModule,
    SeedProducerModule,
    MainCategoryModule,
    SensorModule,
    TypeDataModule,
    NotificationModule,
    AddressModule,
    TransactionModule,
    AuthModule,
    SubscriptionModule,
    PacksModule,
    DocumentsModule,
    DeliveryModule,
    PlantDiseaseModule,
    PartnerModule,
    ContactModule,
    RecipientModule,
    TypevehicleModule,
    DestinationModule,
    CostModule,
    VehicleModule,
    TransporterModule,
    TutorialModule,
    TypePostModule,
    PostModule,
    InvoiceModule,
    LocationModule,
    PackageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
