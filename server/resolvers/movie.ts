import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Int,
  ObjectType,
} from "type-graphql";
import { Movie } from "../entity/Movie";

@InputType()
class MovieInput {
  @Field()
  Title: string;
  @Field()
  Description: string;
  @Field()
  Year: string;
  @Field()
  Length: number;
  @Field()
  Poster: string;
}

@ObjectType()
class MovieError {
  @Field()
  message: string;
}

@ObjectType()
class SearchResponse {
  @Field()
  Title: string;
  @Field()
  Year: string;
  @Field()  
  imdbID: string;
  @Field()  
  Type: string;
  @Field()  
  Poster: string;

}

@ObjectType()
class MovieResponse {
  @Field(() => MovieError, { nullable: true })
  errors?: MovieError;
}

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie], { nullable: true })
  async movies(): Promise<Movie[] | undefined> {
    return Movie.find();
  }

  @Query(() => [SearchResponse], { nullable: true })
  async searchMovies(@Arg("movie", () => String) movie: string): Promise<SearchResponse[] | undefined> {
   return fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${process.env.OMDB_API_KEY}`)
  .then(response => response.json())
  .then(data =>  data.Search);
  }

  @Query(() => Movie, { nullable: true })
  movie(@Arg("id", () => Int) id: number): Promise<Movie | undefined> {
    return Movie.findOne(id);
  }

  @Mutation(() => MovieResponse)
  async createMovie(@Arg("input") input: MovieInput): Promise<MovieResponse> {
    return Movie.create({
      ...input,
    }).save()
    .then(movie =>{
      return {
        errors:{
          message:`${movie.Title} added to Movie list`
        }
      }
    })
    .catch(() => {
      return {
        errors:{
          message:'Movie with that title already exists'
        }
      }
    });
  }

  @Mutation(() => MovieResponse)
  async deleteMovie(@Arg("id", () => Int) id: number): Promise<MovieResponse> {
    return Movie.delete(id)
      .then((success) => {
        if (success.affected == 0) {
          return {
            errors: {
              message: "Theres no such Movie",
            },
          };
        }
        return {
          errors: {
            message: "Movie removed",
          },
        };
      });
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: MovieInput
  ): Promise<Movie | null> {
    const movie = await Movie.findOne(id);
    if (!movie) throw new Error("Movie not found!");
    Object.assign(movie, input);
    return movie.save();
  }
}
