import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function EcommerceCard({ imageUrl, productName, price, description, ean }) {
  return (
    <Card className="w-96 h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
      <CardHeader shadow={false} floated={false} className="h-3/5">
        <img
          src={imageUrl}
          alt="card"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="h-2/5">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {productName}
          </Typography>
          {/* <Typography color="blue-gray" className="font-medium ">
            Selling Price: <span className="line-through">{price}</span>
          </Typography> */}
        </div>
        <Typography
          variant="small"
          color="black"
          className="font-semibold text-xl "
        >
          {description}
        </Typography>
        {/* <Typography color="blue-gray" className="font-medium ">
            EAN: <span className="line-through">{ean}</span>
          </Typography> */}
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          style={{
            background: "linear-gradient(90deg, #1c75bc, #4aa1e0 51%, #1c75bc) var(--x, 100%) / 200%"
          }}
        >
          View catalogue
        </Button>
      </CardFooter>
    </Card>
  );
}
