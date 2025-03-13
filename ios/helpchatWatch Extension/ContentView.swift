//
//  ContentView.swift
//  helpchatWatchApp WatchKit Extension
//
//  Created by Sam YazdanParast on 4/29/21.
//

import SwiftUI
import UIKit
import WatchKit
import Foundation



struct Session {
         static var selectedIndex = 0
     }

struct RemoteImage: View {
    private enum LoadState {
        case loading, success, failure
    }

    private class Loader: ObservableObject {
        var data = Data()
        var state = LoadState.loading

        init(url: String) {
          let mainUrl =  "https://helpchat.care" + url
            guard let parsedURL = URL(string: mainUrl) else {
                fatalError("Invalid URL: \(url)")
            }

            URLSession.shared.dataTask(with: parsedURL) { data, response, error in
                if let data = data, data.count > 0 {
                    self.data = data
                    self.state = .success
                } else {
                    self.state = .failure
                }

                DispatchQueue.main.async {
                    self.objectWillChange.send()
                }
            }.resume()
        }
    }
  
//  func showSwiftUIView(_ coder: NSCoder) -> UIViewController? {
//      return UIHostingController(coder: coder,
//                  rootView: SwiftUIView(text: "Integration One"))
//  }

    @ObservedObject private var loader: Loader
    var loading: Image
    var failure: Image

    var body: some View {
        selectImage()
            .resizable()
    }

    init(url: String, loading: Image = Image(systemName: "photo"), failure: Image = Image(systemName: "multiply.circle")) {
        _loader = ObservedObject(wrappedValue: Loader(url: url))
        self.loading = loading
        self.failure = failure
    }

    private func selectImage() -> Image {
        switch loader.state {
        case .loading:
            return loading
        case .failure:
            return failure
        default:
            if let image = UIImage(data: loader.data) {
                return Image(uiImage: image)
            } else {
                return failure
            }
        }
    }
}

extension Color {
  static let doneColor = Color(red: 60/255, green: 222/255, blue: 204/255)
  static let shareColor = Color(red: 29/255, green: 208/255, blue: 252/255)
  static let canceledColor = Color(red: 26/255, green: 65/255, blue: 227/255)
  static let messageDoneColor = Color(red: 153/255, green: 240/255, blue: 137/255)
  static let messageShareColor = Color(red: 244/255, green: 45/255, blue: 152/255)
  static let backDoneImageColor = Color(red:141/255,green:128/255 , blue:183/255)
  static let finalDone = Color(red:207/255,green:203/255 , blue:217/255)
}

extension View {
    @ViewBuilder func isHidden(_hidden :Bool , remove:Bool = false) -> some View{
      if _hidden {
        if !remove {
          self.hidden()
        }
      } else {
        self
      }
    }
}


extension String {
  func load() -> UIImage {
     
    
    do {
      
      guard let url = URL(string: self) else {
        return UIImage()
      }
      let data : Data = try Data (contentsOf: url)
      return UIImage(data: data) ?? UIImage()
      
    } catch {
      
    }
    
    
    return UIImage()
  }
}






//struct Responce: Codable {
//  var results: [Result]
//}
//
//struct Result : Codable {
//   var canceled : Int
//   var count : Int
//   var created_at : String
//   var created_at_human : String
//   var delete_uri : String
//   var description : String
//   var edit_uri : String
//   var entity_id : Int
//   var entity_title : String
//   var icon : String
//   var id : Int
//   var item_description : String
//   var item_id : Int
//   var item_price : Int
//   var item_title : String
//   var options_string : String
//   var rate : String;
//   var request_id : Int
//  var room_title : String
//  var status : String
//  var status_id : Int
//  var updated_at : String
//}

struct Response: Codable {
    var data: [Result]
}

struct Result: Codable {
     var canceled : Int
     var count : Int
     var created_at : String
     var item_title : String
     var room_title : String
     var created_at_human : String
     var watch_icon :String
     var status_id :Int
     var id : Int
 
}


// test screen
struct TestView: View {
     @State private var data = [Result]()

       var body: some View {
           List(data, id: \.id) { item in
               VStack(alignment: .leading) {
                   Text(item.created_at)
                       
                   Text(item.created_at)
               }
           }.onAppear(perform: loadData)
  }

    func loadData(){
      
    
      guard let url = URL(string: "https://helpchat.care/api/all_requests") else {
          print("Invalid URL")
          return
      }
      
      var request = URLRequest(url: url)
      
                 request.httpMethod = "GET"
                 request.setValue("application/json", forHTTPHeaderField: "Accept")
                 request.setValue("Bearer " + LoginInterfaceController.Session.access_token, forHTTPHeaderField: "Authorization")
      
             URLSession.shared.dataTask(with: request) { data, response, error in
      
    
              do {
                let decoded = try JSONDecoder().decode(Response.self, from: data!)
                  print(decoded)
                self.data = decoded.data
              } catch {
                  print("erorrr",error)
              }
                 
             
             }.resume()
      
    }
}

//extension Image {
//  func data(url:URL) -> Self {
//    if let data = try? Data(contentsOf: url){
//      return Image(uiImage: <#T##UIImage#>(data:data)!)
//         .resizable()
//    }
//    return self .resizable()
//  }
//}
 // ZStack{
//                                               Color.messageShareColor
//                                                VStack{
//
//
//
//                                                  VStack {
//
//                                                   VStack{
//                                                      Image("not_tick")
//                                                      .resizable()
//                                                      .scaledToFit()
//                                                      .frame(width:20,height:20)
//                                                      .aspectRatio(contentMode: .fit)
//
//
//                                                    }
//                                                    .frame(width:30,height:30)
//                                                    .background(SwiftUI.Color.white)
//                                                    .cornerRadius(30)
//
//
//
//
//                                                    VStack {
//                                                      Text("Teilen").bold()
//                                                      Text("rückgängig.").bold()
//                                                    }
//                                                   }
//
//
//                                                  Button("Bestätigen"){
//                                                    self.changeStateRequest(accessToken: LoginInterfaceController.Session.access_token, requestId: self.data[index].id, status: 1)
//                                                  }
//                                                  .buttonStyle(CustomButton())
//                                                }
//                                             }



//----  login screen ----
struct LoginView: View {
  
 

    @State private var data = [Result]()
    @State public var selectedItem = 0
    @State public var currentPage = 0
    @State public var selectedId = 0
     var body: some View {
      
      ZStack{
      
        List {
          
          VStack {
            
            Button(action :{
                print("Tessssst")
//              LoginInterfaceController.pushController(withName: "screenSuccesfulLogin", context: nil)
              
            }) {
              HStack {
                Image("home")
                Text("Zurück")
              }
            }.buttonStyle(GoBackButton())
            
            
          }
          
          
          
          ForEach(data.indices, id: \.self) {index in
                                      ZStack{
                                        PagerManager(pageCount: 2,index: self.data[index].id,currentIndex: self.$currentPage) {
                                          
                                             ZStack{

                                               VStack(alignment: .leading){
                                                
                                                  VStack(){
                                                      
                                                    RemoteImage(url:  self.data[index].watch_icon)
                                                      .aspectRatio(contentMode: .fit)
                                                      .frame(width:50,height:50).background(SwiftUI.Color.white.edgesIgnoringSafeArea(.all))
                                                      .cornerRadius(30)
                                                  }
                                                
                                                
                                                Text(self.data[index].item_title).bold()
                                                Text(self.data[index].room_title).bold()
                                                Text("Vor " + self.data[index].created_at_human).font(.system(size: 9.0))
                                              }.padding()
                                                .isHidden(_hidden: self.getStatus(statue: self.data[index].status_id), remove: self.getStatus(statue: self.data[index].status_id))
                                              
                                              
                                             }.frame(
                                               minWidth: 0,
                                               maxWidth: .infinity,
                                               minHeight: 0,
                                               maxHeight: .infinity,
                                               alignment: .topLeading
                                             ).background(self.changeBkColor(id:index ,color: self.data[index].status_id).edgesIgnoringSafeArea(.all))
                                            
                                                 
                                         
                                             ZStack{
                                               Color.messageDoneColor
                                              .edgesIgnoringSafeArea(.all)

                                               VStack{
                                                
                                                VStack {
     
                                                  
                                                  
                                                  
                                                  VStack {
                                                         VStack{
                                                            Image("tick")
                                                            .resizable()
                                                            .scaledToFit()
                                                            .frame(width:20,height:20)
                                                            .aspectRatio(contentMode: .fit)
                                                            
                                                            
                                                          }
                                                          .frame(width:30,height:30)
                                                          .background(SwiftUI.Color.white)
                                                          .cornerRadius(30)
                                                          .padding().position(x: 55, y: 10)
                                                    
                                                    
                                                    
                                                    
                                                       } .frame(minWidth: 0,
                                                           maxWidth: .infinity,
                                                           minHeight: 30,
                                                           maxHeight: 30,
                                                           alignment: .topLeading)
                                                    .environment(\.layoutDirection, .rightToLeft)
                                                  
                                                  
                                                  VStack {
                                                    Text("Anfrage").bold()
                                                    Text("erledigt.").bold()
                                                  }
                                                 
                                                }
                                               
                                                   
                                                  Button("Bestätigen"){
                                                    self.changeStateRequest(accessToken: LoginInterfaceController.Session.access_token, requestId: self.data[index].id, status: 2)
                                                  }
                                                   .buttonStyle(CustomButton())
                                                }
                                             }
                                          
                                          
                                          
                                        }.isHidden(_hidden: self.getStatus(statue: self.data[index].status_id), remove: self.getStatus(statue: self.data[index].status_id))
                                        
                                        
                                        
                                        VStack() {

                                    VStack {
                                                                                    
                                         HStack {
                                          VStack{
                                            Image("tick")
                                            .resizable()
                                            .scaledToFit()
                                            .frame(width:20,height:20)
                                            .aspectRatio(contentMode: .fit)
                                            
                                            
                                          }
                                          .frame(width:30,height:30)
                                          .background(SwiftUI.Color.white)
                                          .cornerRadius(30)
                                           .padding().position(x: 20, y: 0)
                                          
                                          
                                          RemoteImage(url:  self.data[index].watch_icon)
                                                .aspectRatio(contentMode: .fit)
                                                .frame(width:40,height:40).background(SwiftUI.Color.backDoneImageColor.edgesIgnoringSafeArea(.all))
                                                .cornerRadius(30).position(x: 30, y: 5)
                                          
                                              } .frame(minWidth: 0,
                                                  maxWidth: .infinity,
                                                  minHeight: 30,
                                                  maxHeight: 30,
                                                  alignment: .topLeading)
                                           .environment(\.layoutDirection, .rightToLeft)

                                         VStack {
                                           Text("Erledigt.").bold()
                                         }
                                        
                                       }

                                         Button("Rückgängig ?"){
                                          self.changeStateRequest(accessToken: LoginInterfaceController.Session.access_token, requestId: self.data[index].id, status: 0)
                                         }
                                          .buttonStyle(CustomButton())
                                  }.frame(
                                    minWidth: 0,
                                    maxWidth: .infinity,
                                    minHeight: 0,
                                    maxHeight: .infinity
                                    ).background(Color.finalDone.edgesIgnoringSafeArea(.all))
                                          .isHidden(_hidden: !self.getStatus(statue: self.data[index].status_id), remove: !self.getStatus(statue: self.data[index].status_id))
                                          
        //                                  Spacer()
                                          
                                          //Page Control
                                          HStack{
                                              Circle()
                                                  .frame(width: 6, height: 6)
                                               .foregroundColor(self.currentPage==0 ? Color.white:Color.gray)
                                              Circle()
                                                  .frame(width: 6, height: 6)
                                               .foregroundColor(self.currentPage==1 ? Color.white:Color.gray)
//                                             Circle()
//                                                 .frame(width: 6, height: 6)
//                                               .foregroundColor(self.currentPage==2  ? Color.white:Color.gray)
                                          }.position(x: 65, y: 140)
                                            .isHidden(_hidden: self.getStatus(statue: self.data[index].status_id), remove: self.getStatus(statue: self.data[index].status_id))
                                        }
                                       
                                       .cornerRadius(20)
                                       .frame(minWidth: 0,
                                       maxWidth: .infinity,
                                       minHeight: 145,
                                       maxHeight: 145,
                                       alignment: .topLeading)
                                      
                             }
                             
                }.onAppear(perform: loadData)
      }
      
      
               
  }
  
  func loadData(){
       guard let url = URL(string: "https://helpchat.care/api/all_requests") else {
           print("Invalid URL")
           return
       }
       
       var request = URLRequest(url: url)
       
                  request.httpMethod = "GET"
                  request.setValue("application/json", forHTTPHeaderField: "Accept")
                  request.setValue("Bearer " + LoginInterfaceController.Session.access_token, forHTTPHeaderField: "Authorization")
       
              URLSession.shared.dataTask(with: request) { data, response, error in
       
     
               do {
                 let decoded = try JSONDecoder().decode(Response.self, from: data!)
                   
                 self.data = decoded.data
               } catch {
                   print("erorrr",error)
               }
                  
              
              }.resume()
       
     }
  
  

  
  
  
  
  // change color
  
  func changeBkColor(id :Int , color:Int) -> Color
  {
    
    var defColor = Color.white
    
    if(color  == 1)
    {
      return Color.messageShareColor
    }
    
    else if(color == 2)
    {
      return Color.doneColor
    }
    
    else
    {
      
      if(id == 0 || id == 3 || id == 6 || id == 9 || id == 12 || id == 15 || id == 18){
        defColor =  Color.doneColor
      }
      if(id == 1 || id == 4 ||  id == 7 || id == 10 || id == 13 || id == 16 || id == 19){
        defColor = Color.shareColor
      }
      if(id == 2 || id == 5 || id == 8 || id == 11 || id == 14 || id == 17 || id == 20 ){
        defColor = Color.canceledColor
      }
      
      return defColor
      
    }
    
  }
  
  // return state
func getStatus(statue:Int) -> Bool
{
  if(statue  == 2)
  {
    return true
  }
  else
  {
    return false
  }
  
}
  
  func changeStateRequest(accessToken: String,requestId : Int,status:Int) {
    
//    let doneColor =  self.getUIColor(hex: "#3CDECC")
//    let shareColor = self.getUIColor(hex: "#1DD0FC")
    selectedItem =  requestId
    self.loadData()
     
      let todosEndpoint: String = "https://helpchat.care/api/request"
      guard let todosURL = URL(string: todosEndpoint) else {
        print("Error: cannot create URL")
        return
      }
      var todosUrlRequest = URLRequest(url: todosURL)
      todosUrlRequest.httpMethod = "PUT"
      todosUrlRequest.allHTTPHeaderFields = [
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization" :"Bearer " + accessToken
      ]
      let newTodo: [String: Any] = [
                  "request_item_id": requestId,
                  "status": status]
      let jsonTodo: Data
      do {
        jsonTodo = try JSONSerialization.data(withJSONObject: newTodo)
        todosUrlRequest.httpBody = jsonTodo
      } catch {
        print("Error: cannot create JSON from todo")
        return
      }

      let session = URLSession.shared

      let task = session.dataTask(with: todosUrlRequest) {
        (data, response, error) in
        guard error == nil else {
          print(error!)
          return
        }
        guard let responseData = data else {
          print("Error: did not receive data")
          return
        }
        do {
          guard let receivedTodo = try JSONSerialization.jsonObject(with: responseData,
            options: []) as? [String: Any] else {
              print("Could not get JSON from responseData as dictionary")
              return
          }
          let result = (receivedTodo["data"] as AnyObject).object(forKey:"result")!
          print("RESULTTTT",result)
          self.currentPage = 0

          
          
//          self.backConfirm.setHidden(true)

//          if(status == 1) {
//            self.backRequest.setBackgroundColor(shareColor)
//          } else if (status == 2) {
//            self.backRequest.setBackgroundColor(doneColor)
//          }
          
          
  
          
        } catch  {
          print("error parsing response from POST on /todos")
          return
        }
      }
      task.resume()
    }
}





struct PagerManager<Content: View>: View {

    let pageCount: Int
    @Binding var currentIndex: Int
    let content: Content
    let index : Int
    

    //Set the initial values for the variables
  init(pageCount: Int, index:Int, currentIndex: Binding<Int>, @ViewBuilder content: () -> Content) {
        self.pageCount = pageCount
        self._currentIndex = currentIndex
        self.index = index
        self.content = content()
    
    
    }
    
    @GestureState private var translation: CGFloat = 0
  


    //Set the animation
    var body: some View {
        GeometryReader { geometry in
            HStack(spacing: 0) {
                self.content.frame(width: geometry.size.width)
            }
            .frame(width: geometry.size.width, alignment: .leading)
            .offset(x: (self.index == Session.selectedIndex) ?  -CGFloat(self.currentIndex) * geometry.size.width : 0)
            .offset(x: self.translation)
              
              

            .animation(.easeInOut(duration: 0.23))
            .gesture(
                DragGesture().updating(self.$translation) { value, state, _ in
                    state = value.translation.width
                }
                .onEnded { value in
                    let offset = value.translation.width / geometry.size.width
                    let newIndex = (CGFloat(self.currentIndex) - offset).rounded()
                  
                  
                  print("TESYSYSYSYYYYY",newIndex)
                  
                  
                
                  Session.selectedIndex = self.index
                  
                  
//                    let currentItem = min(max(Int(newIndex), 0), self.pageCount - 1)
                  
                    self.currentIndex = min(max(Int(newIndex), 0), self.pageCount - 1)
                  
                  
                    
                }
            )
        }
    }
}


struct CustomButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
          .background(Color.white)
            .foregroundColor(.black)
            .clipShape(Capsule()).frame(width: 100, height: 45)
            .scaleEffect(configuration.isPressed ? 1 : 1)
           
    }
}
struct GoBackButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
          .background(Color.white)
            .foregroundColor(.black)
          .clipShape(Capsule()).frame(width:130, height: 50)
            .scaleEffect(configuration.isPressed ? 1 : 1)
           
    }
}





 


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}

