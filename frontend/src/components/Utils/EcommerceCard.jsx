import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function EcommerceCard({ imageUrl, productName, price, description }) {
  return (
    <Card className="w-96 h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
      <CardHeader shadow={false} floated={false} className="h-3/5">
        <img
          src={imageUrl}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="h-2/5">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {productName}
          </Typography>
          <Typography color="blue-gray" className="font-medium ">
            Selling Price: <span className="line-through">{price}</span>
          </Typography>
        </div>
        <Typography
          variant="small"
          color="black"
          className="font-semibold text-xl "
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 bg-yellow-800 hover:bg-yellow-700"
        >
          View catalogue
        </Button>
      </CardFooter>
    </Card>
  );
}
